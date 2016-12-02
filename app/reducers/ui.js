import createReducer from './utils/createReducer';
import createAction from './utils/createAction';

const MAIN_MENU_OPEN = 'MAIN_MENU_OPEN';
const MAIN_MENU_CLOSE = 'MAIN_MENU_CLOSE';

export const openMainMenu = createAction(MAIN_MENU_OPEN);
export const closeMainMenu = createAction(MAIN_MENU_CLOSE);

const initialState = {
  mainMenuOpened: false,
};

export default createReducer(initialState, {
  [MAIN_MENU_OPEN]: state => ({ ...state, mainMenuOpened: true }),
  [MAIN_MENU_CLOSE]: state => ({ ...state, mainMenuOpened: false }),
});
