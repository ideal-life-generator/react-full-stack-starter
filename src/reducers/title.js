import makeActionCreator from '../utils/makeActionCreator';
import createReducer from '../utils/createReducer';

const UPDATE_TITLE = 'UPDATE_TITLE';
const SET_DEFAULT_TITLE = 'SET_DEFAULT_TITLE';

export const updateTitle = makeActionCreator(UPDATE_TITLE, 'text');
export const setDefaultTitle = makeActionCreator(SET_DEFAULT_TITLE);

const defaultText = '';

export default createReducer(defaultText, {
  [UPDATE_TITLE](state, { text }) {
    return text;
  },
  [SET_DEFAULT_TITLE](state, { text }) {
    return defaultText;
  },
});
