import { combineReducers } from 'redux';
import GalleryReducer from './galleryReducer';

const rootReducer = combineReducers({
  gallery: GalleryReducer,
});

export default rootReducer;
