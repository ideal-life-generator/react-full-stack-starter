import axios from './utils/axios';
import createReducer from './utils/createReducer';

const REQUEST_USERS = 'REQUEST_USERS';
const USERS_SUCCESS_RESPONSE = 'USERS_SUCCESS_RESPONSE';
const USERS_RESPONSE_FAILURE = 'USERS_RESPONSE_FAILURE';

export function load() {
  return {
    types: [REQUEST_USERS, USERS_SUCCESS_RESPONSE, USERS_RESPONSE_FAILURE],
    fetch: async () => {
      try {
        const { data } = await axios('users');

        return data;
      } catch (error) {
        throw new Error({
          message: 'Error receiving users.',
        });
      }
    },
  };
}

const initialState = {
  isFetched: false,
  isFailure: false,
  collection: [],
  error: {
    message: '',
  },
};

export default createReducer(initialState, {
  [REQUEST_USERS](state) {
    return {
      ...state,
      isFetched: true,
      isFailure: false,
    };
  },
  [USERS_SUCCESS_RESPONSE](state, data) {
    return {
      ...state,
      isFetched: false,
      ...data,
    };
  },
  [USERS_RESPONSE_FAILURE](state, error) {
    return {
      ...state,
      isFetched: false,
      isFailure: true,
      error,
    };
  },
});
