<?php

namespace Wordlift\Dataset;

use Wordlift\Api\Api_Service;
use Wordlift\Jsonld\Jsonld_Service;
use Wordlift\Object_Type_Enum;

class Sync_Service {

	/**
	 * @var \Wordlift_Log_Service
	 */
	private $log;

	/**
	 * @var Api_Service
	 */
	private $api_service;

	/**
	 * @var Jsonld_Service
	 */
	private $jsonld_service;

	/**
	 * @var Sync_Background_Process
	 */
	private $sync_background_process;

	/**
	 * The number of posts processed in one call.
	 *
	 * @var int The batch size.
	 */
	private $batch_size;

	/**
	 * @var Sync_Object_Adapter_Factory
	 */
	private $sync_object_adapter_factory;

	/**
	 * @var Sync_Service
	 */
	private static $instance;

	/**
	 * Constructor.
	 *
	 * @param Api_Service $api_service The {@link Api_Service} used to communicate with the remote APIs.
	 * @param Sync_Object_Adapter_Factory $sync_object_adapter_factory
	 */
	public function __construct( $api_service, $sync_object_adapter_factory ) {

		$this->log = \Wordlift_Log_Service::get_logger( get_class() );

		$this->api_service                 = $api_service;
		$this->sync_object_adapter_factory = $sync_object_adapter_factory;
		$this->batch_size                  = 10;

		// You need to initialize this early, otherwise the Background Process isn't registered in AJAX calls.
		$this->sync_background_process = new Sync_Background_Process( $this );;

		self::$instance = $this;

	}

	public static function get_instance() {
		return self::$instance;
	}

	/**
	 * Starts a new synchronization.
	 */
	public function start() {

		// Create the Sync_Background_Process.
		$this->sync_background_process->start();

	}

	/**
	 * Request to cancel a background process.
	 */
	public function request_cancel() {

		$this->sync_background_process->request_cancel();

	}

	/**
	 * Get the next post IDs to synchronize.
	 *
	 * @return array An array of post IDs.
	 */
	public function next() {
		global $wpdb;

		$state = $this->info();

		// Limit the query to the allowed post types.
		$post_type_in = implode( "','", array_map( 'esc_sql', \Wordlift_Entity_Service::valid_entity_post_types() ) );

		// Get the next post ID.
		return $wpdb->get_col( "
			SELECT p.ID
			FROM $wpdb->posts p
			WHERE p.post_status = 'publish'
			  AND p.post_type IN ('$post_type_in')
			ORDER BY p.ID
			LIMIT {$state->index},{$this->batch_size}
			" );
	}

	public function count() {
		global $wpdb;
		$post_type_in = implode( "','", array_map( 'esc_sql', \Wordlift_Entity_Service::valid_entity_post_types() ) );

		return $wpdb->get_var( "
			SELECT COUNT(1)
			FROM $wpdb->posts p
			WHERE p.post_status = 'publish'
			  AND p.post_type IN ('$post_type_in')
			" );
	}

	public function info() {
		return Sync_Background_Process::get_state();
	}

	/**
	 * @param $type
	 * @param $post_id
	 *
	 * @throws \Exception
	 */
	public function sync_one( $type, $post_id ) {

		if ( Object_Type_Enum::POST !== $type ) {
			throw new \Exception( "Type $type is unsupported." );
		}

		$this->sync_items( array( $post_id ), false );
	}

	public function sync_items( $post_ids, $clear = true ) {

		$this->log->debug( sprintf( 'Synchronizing post(s) %s...', implode( ', ', $post_ids ) ) );

		debug_print_backtrace( DEBUG_BACKTRACE_IGNORE_ARGS, 10 );

		// If we're starting the sync, try to clear the dataset.
		if ( $clear && 0 === $this->info()->index ) {
			$this->api_service->request( 'DELETE', '/middleware/dataset/delete' );
		}

		$that         = $this;
		$request_body = array_filter( array_map( function ( $post_id ) use ( $that ) {
			// Check if the post type is public.
			$post_type     = get_post_type( $post_id );
			$post_type_obj = get_post_type_object( $post_type );
			if ( ! $post_type_obj->public ) {
				return false;
			}

			$is_private       = ( 'publish' !== get_post_status( $post_id ) );
			$uri              = get_post_meta( $post_id, 'entity_url', true );
			$object_adapter   = $that->sync_object_adapter_factory->create( Object_Type_Enum::POST, $post_id );
			$jsonld           = $object_adapter->get_jsonld_and_update_hash();
			$jsonld_as_string = wp_json_encode( $jsonld );

			$that->log->trace( "Posting JSON-LD:\n$jsonld_as_string" );

			return array(
				'uri'     => $uri,
				'model'   => $jsonld_as_string,
				'private' => $is_private
			);
		}, $post_ids ) );

		// There's no point in making a request if the request is empty.
		if ( empty( $request_body ) ) {
			return true;
		}

		// Make a request to the remote endpoint.
		$state              = $this->info();
		$state_header_value = str_replace( "\n", '', wp_json_encode( $state ) );
		$response           = $this->api_service->request(
			'POST', '/middleware/dataset/batch',
			array(
				'Content-Type'                     => 'application/json',
				'X-Wordlift-Dataset-Sync-State-V1' => $state_header_value
			),
			wp_json_encode( $request_body ) );

		$this->log->debug( "Response received: " . ( $response->is_success() ? 'yes' : 'no' ) );

		// Update the sync date in case of success, otherwise log an error.
		if ( $response->is_success() ) {

			foreach ( $post_ids as $post_id ) {
				update_post_meta( $post_id, '_wl_synced_gmt', current_time( 'mysql', true ) );
			}

			$this->log->debug( sprintf( 'Posts %s synchronized.', implode( ', ', $post_ids ) ) );

			return true;
		} else {
			// @@todo: should we put a limit retry here?
			$response_dump = var_export( $response, true );
			$this->log->error(
				sprintf( 'An error occurred while synchronizing the data for post IDs %s: %s', implode( ', ', $post_ids ), $response_dump ) );

			return false;
		}

	}

	/**
	 * @param $post_id
	 *
	 * @todo Complete the delete item.
	 */
	public function delete_item( $post_id ) {
		$uri = get_post_meta( $post_id, 'entity_url', true );
		// Make a request to the remote endpoint.
		$state_header_value = str_replace( wp_json_encode( $this->info() ), "\n", '' );
		$response           = $this->api_service->request(
			'DELETE', '/middleware/dataset?uri=' . rawurlencode( $uri ),
			array(
				'Content-Type'                     => 'application/ld+json',
				'X-Wordlift-Dataset-Sync-State-V1' => $state_header_value
			) );
	}

	public function get_batch_size() {

		return $this->batch_size;
	}

	public function delete_one($type, $object_id) {

		// @@todo implement.

	}

}
