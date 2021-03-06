import { SubmissionError } from 'redux-form';
import cookie from 'react-cookie';
import createReducer from './utils/create-reducer';
import createAction from './utils/create-action';
import createAsyncAction from './utils/create-async-action';
import axios, { setDefaultHeader } from './utils/axios';

const STORE_USER = 'STORE_USER';
const REMOVE_USER_FROM_STORE = 'REMOVE_USER_FROM_STORE';
const SET_USER = 'SET_USER';
const RESET_USER = 'RESET_USER';
const REQUEST_ME = 'REQUEST_ME';
const ME_SUCCESS_RESPONSE = 'ME_SUCCESS_RESPONSE';
const ME_RESPONSE_FAILURE = 'ME_RESPONSE_FAILURE';

export const setStored = createAction(STORE_USER);
export const setNotAuthorized = createAction(REMOVE_USER_FROM_STORE);
export const setUser = createAction(SET_USER, 'user');
export const reset = createAction(RESET_USER);

export function storeUser({ _id, name, refreshToken, token }) {
  cookie.save('refresh-token', refreshToken);
  cookie.save('token', token);

  return dispatch => dispatch(setUser({ _id, name }));
}

export async function login(values, dispatch) {
  try {
    const { data: user } = await axios.post('login', values);

    dispatch(storeUser(user));

    return user;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new SubmissionError(error.response.data);
    }

    throw new SubmissionError({ _error: 'Submit error.' });
  }
}

export async function signup(values, dispatch) {
  try {
    const { data: user } = await axios.post('signup', values);

    dispatch(storeUser(user));

    return user;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new SubmissionError(error.response.data);
    }

    throw new SubmissionError({ _error: 'Submit error.' });
  }
}

export function logout() {
  cookie.remove('refresh-token');
  cookie.remove('token');

  return dispatch => dispatch(reset());
}

export const me = createAsyncAction([
  REQUEST_ME,
  ME_SUCCESS_RESPONSE,
  ME_RESPONSE_FAILURE,
], async () => {
  try {
    return await axios('users/me');
  } catch (error) {
    const { response: { data } } = error;

    throw {
      _error: data,
    };
  }
});

export function checkStoredUser() {
  const refreshToken = cookie.load('refresh-token');
  const token = cookie.load('token');

  if (token || refreshToken) {
    setDefaultHeader('Authorization', token);

    return async (dispatch) => {
      dispatch(setStored());

      await dispatch(me());
    };
  }

  return undefined;
}

const initialState = {
  isStored: false,
  isAuthenticated: false,
  isFetched: false,
  _id: null,
  name: null,
};

export default createReducer(initialState, {
  [STORE_USER]: state => ({ ...state, isStored: true }),
  [REMOVE_USER_FROM_STORE]: state => ({ ...state, isStored: false }),
  [SET_USER]: (state, { user }) => ({ ...state, isStored: true, isAuthenticated: true, ...user }),
  [REQUEST_ME]: state => ({ ...state, isFetched: true }),
  [ME_SUCCESS_RESPONSE]: (state, { response: { data: user } }) => ({ ...state, isAuthenticated: true, isFetched: false, ...user }),
  [ME_RESPONSE_FAILURE]: state => ({ ...state, isAuthenticated: false, isFetched: false, _id: null, name: null }),
  [RESET_USER]: state => ({ ...state, isStored: false, isAuthenticated: false, isFetched: false, _id: null, name: null }),
});
