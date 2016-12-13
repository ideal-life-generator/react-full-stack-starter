import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as form } from 'redux-form';
import ui from './ui';
import users from './users';
import user from './user';
import oauth2 from './oauth2';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  form,
  ui,
  users,
  user,
  oauth2,
});
