<?php

namespace Wordlift\Dataset;

abstract class Abstract_Sync_Hooks {

	private $queue = array();

	function __construct() {

		add_action( 'shutdown', array( $this, 'shutdown' ) );

	}

	protected function enqueue( $item ) {

		if ( empty( $this->queue ) || $item !== $this->queue[ count( $this->queue ) - 1 ] ) {
			$this->queue[] = $item;
		}

	}

	public function shutdown() {
		foreach ( $this->queue as $callback ) {
			call_user_func( array( $this, $callback[0] ), $callback[1] );
		}
	}

}
