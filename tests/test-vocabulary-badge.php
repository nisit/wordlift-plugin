<?php

use Wordlift\Vocabulary\Data\Term_Count\Cached_Term_Count;
use Wordlift\Vocabulary\Menu\Badge\Badge_Generator;

/**
 * @since 3.30.0
 * @group vocabulary
 * @author Naveen Muthusamy <naveen@wordlift.io>
 */
class Vocabulary_Badge_Test extends \Wordlift_Vocabulary_Unit_Test_Case {


	public function test_round_to_nearest_hundred_for_term_count() {

		$result = Badge_Generator::round_to_nearest_hundred( 340 );
		$this->assertEquals( 300, $result );
		$result = Badge_Generator::round_to_nearest_hundred( 290 );
		$this->assertEquals( 200, $result );
		$result = Badge_Generator::round_to_nearest_hundred( 200 );
		$this->assertEquals( 200, $result );
		$result = Badge_Generator::round_to_nearest_hundred( 70 );
		$this->assertEquals( 70, $result );

	}


	public function test_badge_generated_html() {
		$result        = Badge_Generator::generate_html( 340 );
		$expected_html = "<span class=\"wl-admin-menu-badge\">300+</span>";
		$this->assertEquals( $result, $expected_html );
	}

	public function test_badge_generated_html_for_numbers_less_than_100_should_return_without_plus_sign() {
		$result        = Badge_Generator::generate_html( 70 );
		$expected_html = "<span class=\"wl-admin-menu-badge\">70</span>";
		$this->assertEquals( $result, $expected_html );
	}


	public function test_term_count_should_be_cached() {
		wp_insert_term( "foo", "post_tag" );
		wp_insert_term( "bar", "post_tag" );
		$this->assertFalse( get_transient( Cached_Term_Count::TRANSIENT_KEY ) );
		// make a call to term count service, we should have transient now.
		$term_count_provider = Term_Count_Factory::get_instance( 'cached_term_count' );
		$term_count_provider->get_term_count();
		$this->assertEquals( 2, get_transient( Cached_Term_Count::TRANSIENT_KEY ) );
		// on next call should get the transient, to verify we update transient with different value and expect it
		// to return the updated value.
		set_transient( Cached_Term_Count::TRANSIENT_KEY, 100 );
		$count = $term_count_provider->get_term_count();
		$this->assertEquals( 100, $count, 'Should return count from transient cache');

	}


}