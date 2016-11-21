import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import createSong from './createSong';

export default combineReducers({
  createSong,
  routing: routerReducer,
});
