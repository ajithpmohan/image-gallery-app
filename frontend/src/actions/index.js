import * as actionTypes from 'constants/actionTypes';

export const doSetCategories = (payload) => ({
  type: actionTypes.SET_CATEGORIES,
  payload,
});

export const doSetImages = (payload) => ({
  type: actionTypes.SET_IMAGES,
  payload,
});

export const doFetchCategories = (query) => ({
  type: actionTypes.CATEGORY_FETCH,
  query,
});

export const doFetchImages = (query) => ({
  type: actionTypes.IMAGE_FETCH,
  query,
});
