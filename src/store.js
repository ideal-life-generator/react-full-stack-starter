import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import fetchMiddleware from './modules/utils/fetchMiddleware';
import reducers from './modules';

function getInitialState() {
  if (typeof window !== 'undefined') {
    const { INITIAL_STATE } = window;

    return INITIAL_STATE;
  } else {
    return {};
  }
}

export default createStore(
  reducers,
  getInitialState(),
  // compose(
    applyMiddleware(
      // thunk,
      fetchMiddleware,
    ),
  // ),
);

if (module.hot) {
  module.hot.accept('./modules', () => {
    const newReducers = require('./modules').default;

    store.replaceReducer(newReducers);
  });
}
