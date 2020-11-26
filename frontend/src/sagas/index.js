import { takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from 'constants/actionTypes';
import { fetchCategories, fetchImages } from './fetch';

function* watchAll() {
  yield all([
    takeEvery(actionTypes.CATEGORY_FETCH, fetchCategories),
    takeEvery(actionTypes.IMAGE_FETCH, fetchImages),
  ]);
}

export default watchAll;
