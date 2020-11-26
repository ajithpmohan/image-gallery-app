import * as actionTypes from 'constants/actionTypes';

const initialState = {
  categories: [],
  images: [],
};

const setCategories = (state, categories) => ({
  ...state,
  categories,
});

const updateCategories = (state, category) => ({
  ...state,
  categories: [...state.categories, category],
});

const setImages = (state, images) => ({
  ...state,
  images,
});

const updateImages = (state, image) => ({
  ...state,
  images: [...state.images, image],
});

const GalleryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CATEGORIES:
      return setCategories(state, action.payload);
    case actionTypes.UPDATE_CATEGORIES:
      return updateCategories(state, action.payload);
    case actionTypes.SET_IMAGES:
      return setImages(state, action.payload);
    case actionTypes.UPDATE_IMAGES:
      return updateImages((state, action.payload));
    default:
      return state;
  }
};

export default GalleryReducer;
