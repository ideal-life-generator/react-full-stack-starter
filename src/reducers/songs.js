import fetch from 'isomorphic-fetch';
import createReducer from '../utils/createReducer';
import makeActionCreator from '../utils/makeActionCreator';

const SONGS_OPEN_CREATE_PANEL = 'SONGS_OPEN_CREATE_PANEL';
const SONGS_CLOSE_CREATE_PANEL = 'SONGS_CLOSE_CREATE_PANEL';
const SONGS_REQUEST_ITEMS = 'SONGS_REQUEST_ITEMS';
const SONGS_ITEMS_SUCCESS_RESPONSE = 'SONGS_ITEMS_SUCCESS_RESPONSE';
const SONGS_ITEMS_RESPONSE_FAILURE = 'SONGS_ITEMS_RESPONSE_FAILURE';

export const openCreatePanel = makeActionCreator(SONGS_OPEN_CREATE_PANEL);
export const closeCreatePanel = makeActionCreator(SONGS_CLOSE_CREATE_PANEL);

export function loadItems() {
  return {
    types: [
      SONGS_REQUEST_ITEMS,
      SONGS_ITEMS_SUCCESS_RESPONSE,
      SONGS_ITEMS_RESPONSE_FAILURE,
    ],
    callAPI: async () => {
      const response = await fetch('http://localhost:8080/items');

      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }

      return await response.json();
    },
  };
}

const initialState = {
  isFetched: false,
  isFailure: false,
  items: [],
  createIsActive: true,
};

export default createReducer(initialState, {
  [SONGS_OPEN_CREATE_PANEL](state) {
    return {
      ...state,
      createIsActive: true,
    };
  },
  [SONGS_CLOSE_CREATE_PANEL](state) {
    return {
      ...state,
      createIsActive: false,
    };
  },
  [SONGS_REQUEST_ITEMS](state) {
    return {
      ...state,
      isFetched: true,
      isFailure: false,
    };
  },
  [SONGS_ITEMS_SUCCESS_RESPONSE](state, { response }) {
    return {
      ...state,
      isFetched: false,
      items: response,
    };
  },
  [SONGS_ITEMS_RESPONSE_FAILURE](state) {
    return {
      ...state,
      isFetched: false,
      isFailure: true,
    };
  },
});
