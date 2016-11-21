import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import callAPIMiddleware from './utils/callAPIMiddleware';
import reducers from './reducers';

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
  compose(
    applyMiddleware(
      thunk,
      callAPIMiddleware
    ),
  )
);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const newReducers = require('./reducers/index').default;

    store.replaceReducer(newReducers);
  });
}
