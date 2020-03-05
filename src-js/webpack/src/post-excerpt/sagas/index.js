/**
 * This files provide the sagas for post excerpt
 *
 * @since 3.26.0
 * @author Naveen Muthusamy <naveen@wordlift.io>
 */

/**
 * External dependencies
 */
import { takeLatest } from "redux-saga/effects";

/**
 * Internal dependencies.
 */
import {requestPostExcerpt, updatePostExcerpt, updateRequestStatus} from "../actions";
import getPostExcerpt from "../api";

function* handleRefreshPostExcerpt(action) {
  const { postBody } = action.payload;
  // set request state to in progress.
  yield put(updateRequestStatus(true));
  const response  = yield call(getPostExcerpt, postBody);
  if ( response.post_excerpt !== undefined ) {
    yield put(updatePostExcerpt(response.post_excerpt))
  }
  // Request is complete, now dont show the loading icon.
  yield put(updateRequestStatus(false));
}

function* rootSaga() {
  yield takeLatest(requestPostExcerpt, handleRefreshPostExcerpt);
}

export default rootSaga;