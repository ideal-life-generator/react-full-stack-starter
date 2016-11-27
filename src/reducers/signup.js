import axios from './utils/axios';
import createReducer from './utils/createReducer';

export function submit() {
  return {
    types: [REQUEST_USERS, USERS_SUCCESS_RESPONSE, USERS_RESPONSE_FAILURE],
    fetch: async () => {
      try {
        const { data } = await axios('/users');

        return data;
      } catch (error) {
        throw {
          message: 'Error receiving users.',
        };
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
