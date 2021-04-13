<?php

namespace Wordlift\Videoobject\Provider\Client;
/**
 * @since 3.31.0
 * @author Naveen Muthusamy <naveen@wordlift.io>
 * This class acts as api client for vimeo.
 */
class Vimeo_Client implements Client {
	/**
	 * @param $vimeo_urls
	 * @param $post_id
	 *
	 * @return string[]
	 */
	public function get_video_ids_for_api( $vimeo_urls ) {

		return array_filter( array_map( array( $this, 'vimeo_url_to_id' ), $vimeo_urls ) );
	}


	public function get_data( $video_urls ) {
		$ids = join( ",", $this->get_video_ids_for_api( $video_urls ) );

		if ( ! $ids ) {
			return array();
		}

		$api_url = $this->get_api_url() . "/videos/";
		$api_url = add_query_arg( array(
			'uris'   => $ids,
			'fields' => 'name,description,link,uri,duration,release_time,pictures'
		), $api_url );


		$response = wp_remote_get( $api_url, array(
			'headers' => array(
				'Authorization' => 'bearer ' . $this->get_api_key()
			)
		) );

		return wp_remote_retrieve_body( $response );
	}

	public function get_api_key() {
		return get_option( $this->get_api_key_option_name(), false );
	}

	public function get_api_key_option_name() {
		return '_wl_videoobject_vimeo_api_key';
	}

	public function get_api_url() {
		return 'https://api.vimeo.com';
	}
}