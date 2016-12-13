import axios from './utils/axios';
import createReducer from './utils/create-reducer';
import createAsyncAction from './utils/create-async-action';

const REQUEST_USERS = 'REQUEST_USERS';
const USERS_SUCCESS_RESPONSE = 'USERS_SUCCESS_RESPONSE';
const USERS_RESPONSE_FAILURE = 'USERS_RESPONSE_FAILURE';

export const load = createAsyncAction([
  REQUEST_USERS,
  USERS_SUCCESS_RESPONSE,
  USERS_RESPONSE_FAILURE,
], async () => {
  try {
    return await axios('users');
  } catch (error) {
    throw {
      message: 'Error receiving users.',
    };
  }
});

const initialState = {
  isFetched: false,
  isFailure: false,
  collection: [],
  error: {
    message: '',
  },
};

export default createReducer(initialState, {
  [REQUEST_USERS]: state => ({
    ...state,
    isFetched: true,
    isFailure: false,
  }),
  [USERS_SUCCESS_RESPONSE]: (state, { response: { data } }) => ({
    ...state,
    isFetched: false,
    ...data,
  }),
  [USERS_RESPONSE_FAILURE]: (state, { error }) => ({
    ...state,
    isFetched: false,
    isFailure: true,
    error,
  }),
});
