import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as form } from 'redux-form';
import ui from './ui';
import users from './users';

export default combineReducers({
  reduxAsyncConnect,
  form,
  ui,
  users,
});