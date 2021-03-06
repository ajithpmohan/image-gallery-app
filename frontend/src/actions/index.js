import * as actionTypes from 'constants/actionTypes';

export const doSetCategories = (payload) => ({
  type: actionTypes.SET_CATEGORIES,
  payload,
});

export const doUpdateCategories = (payload) => ({
  type: actionTypes.UPDATE_CATEGORIES,
  payload,
});

export const doSetImages = (payload) => ({
  type: actionTypes.SET_IMAGES,
  payload,
});

export const doUpdateImages = (payload) => ({
  type: actionTypes.UPDATE_IMAGES,
  payload,
});
