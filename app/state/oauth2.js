import { combineReducers } from 'redux';
import createReducer from './utils/create-reducer';
import createAsyncAction from './utils/create-async-action';
import axios from './utils/axios';

const OAUTH2_GOOGLE_REQUEST = 'OAUTH2_GOOGLE_REQUEST';
const OAUTH2_GOOGLE_RESPONSE = 'OAUTH2_GOOGLE_RESPONSE';
const OAUTH2_GOOGLE_FAILURE = 'OAUTH2_GOOGLE_FAILURE';

export const google = createAsyncAction([
  OAUTH2_GOOGLE_REQUEST,
  OAUTH2_GOOGLE_RESPONSE,
  OAUTH2_GOOGLE_FAILURE,
], async (query, payload) => {
  try {
    return await axios.post(`oauth2/${query}`, payload);
  } catch (error) {
    throw error;
  }
});

const initialState = {
  isFetched: false,
  isFailure: false,
  errorData: null,
};

const googleReducer = createReducer(initialState, {
  [OAUTH2_GOOGLE_REQUEST]: state => ({ ...state, isFetched: true, isFailure: false }),
  [OAUTH2_GOOGLE_RESPONSE]: state => ({ ...state, isFetched: false }),
  [OAUTH2_GOOGLE_FAILURE]: (state, error) => ({ ...state, isFetched: false, isFailure: true, errorData: error }),
});

export default combineReducers({
  google: googleReducer,
});
