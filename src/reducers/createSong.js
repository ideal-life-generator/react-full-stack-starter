import fetch from 'isomorphic-fetch';
import createReducer from '../utils/createReducer';
import makeActionCreator from '../utils/makeActionCreator';

const CREATE_SONG_SET_ARTIST = 'CREATE_SONG_SET_ARTIST';
const CREATE_SONG_SET_TITLE = 'CREATE_SONG_SET_TITLE';
const CREATE_SONG_SET_LENGTH = 'CREATE_SONG_SET_LENGTH';

export const setArtist = makeActionCreator(CREATE_SONG_SET_ARTIST, 'artist');
export const setTitle = makeActionCreator(CREATE_SONG_SET_TITLE, 'title');
export const setLength = makeActionCreator(CREATE_SONG_SET_LENGTH, 'length');

const initialState = {
  artist: undefined,
  title: undefined,
  length: undefined,
};

export default createReducer(initialState, {
  [CREATE_SONG_SET_ARTIST](state, { artist }) {
    return {
      ...state,
      artist,
    };
  },
  [CREATE_SONG_SET_TITLE](state, { title }) {
    return {
      ...state,
      title,
    };
  },
  [CREATE_SONG_SET_LENGTH](state, { length }) {
    return {
      ...state,
      length,
    };
  },
});
