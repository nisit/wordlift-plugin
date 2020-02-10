/**
 * This file provides the action types used by FAQ meta box.
 *
 * @since 3.26.0
 * @author Naveen Muthusamy <naveen@wordlift.io>
 */

/**
 * Action type for adding new question using sidebar FAQ
 * @type {string}
 */
export const REQUEST_FAQ_ADD_NEW_QUESTION = "REQUEST_FAQ_ADD_NEW_QUESTION";

/**
 * Action type for getting FAQ items.
 * @type {string}
 */
export const REQUEST_GET_FAQ_ITEMS = "REQUEST_GET_FAQ_ITEMS";

/**
 * Action for updating FAQ items in the store with new data
 * @type {string}
 */
export const UPDATE_FAQ_ITEMS = "UPDATE_FAQ_ITEMS";

/**
 * Action for updating new question typed by user.
 * @type {string}
 */
export const UPDATE_QUESTION_ON_INPUT_CHANGE = "UPDATE_QUESTION_ON_INPUT_CHANGE";

/**
 * Action for updating store when question is selected by user.
 * @type {string}
 */
export const QUESTION_SELECTED_BY_USER = "QUESTION_SELECTED_BY_USER";

/**
 * Action for updating store when the edit screen is closed.
 * @type {string}
 */
export const CLOSE_EDIT_SCREEN = "CLOSE_EDIT_SCREEN";

/**
 * Action type for updating FAQ items on ui changing the data.
 * @type {string}
 */
export const REQUEST_UPDATE_FAQ_ITEMS = "REQUEST_UPDATE_FAQ_ITEMS";

/**
 * Action type for updating FAQ item on store.
 * @type {string}
 */
export const UPDATE_FAQ_ITEM = "UPDATE_FAQ_ITEM";