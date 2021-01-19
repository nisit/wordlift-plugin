<?php
/**
 * @since 3.27.9
 * @author Naveen Muthusamy <naveen@wordlift.io>
 */

use Wordlift\Jsonld\Jsonld_Service;
use Wordlift\Object_Type_Enum;

/**
 * Class Jsonld_Static_Home_Page_Test
 * @group jsonld
 */
class Jsonld_Static_Home_Page_Test extends Wordlift_Unit_Test_Case {

	/**
	 * @var Jsonld_Service
	 */
	private $jsonld_service;

	public function setUp() {
		parent::setUp();
		$this->jsonld_service = Jsonld_Service::get_instance();
	}


	public function test_when_the_homepage_is_static_and_not_singular_should_not_have_mentions_property() {

		$home_page = $this->factory()->post->create();
		$entity_1  = $this->factory()->post->create( array( 'post_type' => 'entity' ) );
		$entity_2  = $this->factory()->post->create( array( 'post_type' => 'entity' ) );

		// Link the home page with entities.
		wl_core_add_relation_instance( $home_page, WL_WHAT_RELATION, $entity_1 );
		wl_core_add_relation_instance( $home_page, WL_WHAT_RELATION, $entity_2 );

		// Emulate the collections page query.
		global $wp_query;
		$args     = array(
			'posts_per_page' => - 1,
			'post_type'      => 'post',
		);
		$wp_query = new WP_Query( $args );
		$jsonld   = $this->jsonld_service->get( Object_Type_Enum::HOMEPAGE, $home_page );
		$this->assertFalse( array_key_exists( 'mentions', $jsonld ), 'Should not have mentions property in the  jsonld' );

	}


}