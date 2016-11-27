import createReducer from './utils/createReducer';
import createAction from './utils/createAction';

const MAIN_MENU_OPEN = 'MAIN_MENU_OPEN';
const MAIN_MENU_CLOSE = 'MAIN_MENU_CLOSE';

export const open = createAction(MAIN_MENU_OPEN);
export const close = createAction(MAIN_MENU_CLOSE);

const initialState = false;

export default createReducer(initialState, {
  [MAIN_MENU_OPEN](state) { return true; },
  [MAIN_MENU_CLOSE](state) { return false; },
});
