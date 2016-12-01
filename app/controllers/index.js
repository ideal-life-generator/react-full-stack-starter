import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as form } from 'redux-form';
import mainMenu from './main-menu';
import users from './users';

export default combineReducers({
  reduxAsyncConnect,
  form,
  mainMenu,
  users,
});
