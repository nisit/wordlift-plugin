/**
 * Represents a single section of table.
 * @since 3.29.1
 * @author Naveen Muthusamy <naveen@wordlift.io>
 */


import TableRow from "./table-row";

export default class TableSection {

    /**
     * @param tableSectionData An array of table rows data
     */
    constructor(tableSectionData) {
        this._rows = []
        if ( tableSectionData && Array.isArray(tableSectionData) ) {
            this._rows = tableSectionData.map((row)=> {
                return new TableRow(row);
            })
        }
    }

    get rows() {
        return this._rows
    }


}