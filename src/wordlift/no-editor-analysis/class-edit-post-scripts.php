<?php
namespace Wordlift\No_Editor_Analysis;

use Wordlift\Common\Editor\Edit_Post_Loader;
use Wordlift\Scripts\Scripts_Helper;

class Edit_Post_Scripts extends  Edit_Post_Loader {

	const HANDLE = 'wl-no-editor-analysis-deps';

	public function run_on_edit_post_screen() {


		Scripts_Helper::enqueue_based_on_wordpress_version(
			self::HANDLE,
			plugin_dir_url(dirname(__DIR__)) . 'js/dist/no-editor-analysis',
			array(),
			true
		);


	}

}