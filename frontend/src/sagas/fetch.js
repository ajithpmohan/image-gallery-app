import { call, put } from 'redux-saga/effects';
import { doSetCategories, doSetImages } from 'actions';

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_DOMAIN;

const fetch = (query) =>
  fetch(SERVER_BASE_URL + query).then((response) => response.json());

function* fetchCategories(action) {
  const { query } = action;
  const payload = yield call(fetch, query);
  yield put(doSetCategories(payload));
}

function* fetchImages(action) {
  const { query } = action;
  const payload = yield call(fetch, query);
  yield put(doSetImages(payload));
}

export { fetchCategories, fetchImages };

export default fetch;
