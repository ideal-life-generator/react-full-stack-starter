import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import title from './title';
import createSong from './createSong';

export default combineReducers({
  title,
  createSong,
  routing: routerReducer,
});
