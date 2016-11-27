import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import mainMenu from './main-menu';
import users from './users';

export default combineReducers({
  form,
  mainMenu,
  users,
});
