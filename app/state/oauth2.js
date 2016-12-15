import { combineReducers } from 'redux';
import createReducer from './utils/create-reducer';
import createAsyncAction from './utils/create-async-action';
import axios from './utils/axios';
import createPopup from '../utils/popup';
import { storeUser } from './user';
import { url, googleClientId, googleRedirectUrl } from '../../config';

const OAUTH2_GOOGLE_REQUEST = 'OAUTH2_GOOGLE_REQUEST';
const OAUTH2_GOOGLE_RESPONSE = 'OAUTH2_GOOGLE_RESPONSE';
const OAUTH2_GOOGLE_FAILURE = 'OAUTH2_GOOGLE_FAILURE';

const settings = {
  google: {
    oauth2Url: 'https://accounts.google.com/o/oauth2/v2/auth?'
      + 'response_type=code&'
      + `client_id=${googleClientId}&`
      + `redirect_uri=${googleRedirectUrl}&`
      + 'scope=profile&'
      + 'prompt=consent&'
      + 'include_granted_scopes=true&'
      + 'access_type=online',
    popupSize: { width: 450, height: 400 },
  },
};

const actions = {
  google: createAsyncAction([
    OAUTH2_GOOGLE_REQUEST,
    OAUTH2_GOOGLE_RESPONSE,
    OAUTH2_GOOGLE_FAILURE,
  ], async (payload, dispatch) => {
    try {
      const { data: user } = await axios.post('oauth2/google', payload);

      dispatch(storeUser(user));
    } catch (error) {
      throw error;
    }
  }),
};

export function handler(type) {
  const { [type]: { oauth2Url, popupSize: { width, height } } } = settings;

  const popup = createPopup(oauth2Url, { width, height });

  return (dispatch) => {
    function messageHandler({ origin, data }) {
      if (origin === url) {
        const { action, ...payload } = data;
        const { [action]: actionHandler } = actions;

        dispatch(actionHandler(payload));

        window.removeEventListener('message', messageHandler);

        popup.close();
      }
    }

    window.addEventListener('message', messageHandler);
  };
}

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
