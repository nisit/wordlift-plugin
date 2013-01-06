<?php

class WordLift_EntitiesAjaxService {
	
	public $queryService;
	public $recordSetService;

	const DEFAULT_LIMIT = 10;
	const DEFAULT_OFFSET = 0;


	public function get( $limit = self::DEFAULT_LIMIT, $offset = self::DEFAULT_OFFSET, $name = NULL, $order = NULL ) {

		$whereClause = <<<EOF

	[] a fise:Enhancement ;
		wordlift:selected true ;
		fise:entity-reference ?subject .
	?subject a ?a ;
		schema:name ?name .
EOF;

		if ( ! empty( $name ) ) :
			$escNameFilter = $this->queryService->escapeValue( $name );
			$whereClause .= " FILTER regex( str(?name), \"$escNameFilter\", \"i\" )";
		endif;

		// public function execute( $fields, $whereClause = NULL, $limit = NULL, $offset = NULL, &$count = NULL, $groupBy = NULL, $orderBy = NULL ) {
		$count = 0;
		$recordset = $this->queryService->execute( "DISTINCT ?name ?a ?subject", $whereClause, $limit, $offset, $count, "?name ?a ?subject", $order );
		// var_export( $recordset );

		$this->recordSetService->write( $recordset, $limit, $offset, $count );
	}

}

?>