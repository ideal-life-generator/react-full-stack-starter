import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import fetchMiddleware from './reducers/utils/fetchMiddleware';
import DevTools from './containers/DevTools';
import reducers from './reducers';

const { env: { NODE_ENV, RENDERING_ON } } = process;

function generateCompose(middlewares) {
  if (NODE_ENV === 'development' && RENDERING_ON === 'browser') {
    return compose(
      middlewares,
      DevTools.instrument(),
    );
  }

  if ((NODE_ENV === 'development' && RENDERING_ON === 'server') || NODE_ENV === 'production') {
    return compose(
      middlewares,
    );
  }
}

export default (initialState = {}) => {
  const store = createStore(
    reducers,
    initialState,
    generateCompose(
      applyMiddleware(
        thunk,
        fetchMiddleware,
      ),
    ),
  );

  if (NODE_ENV === 'development' && RENDERING_ON === 'browser') {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        const nextReducers = require('./reducers').default;

        store.replaceReducer(nextReducers);
      });
    }
  }

  return store;
};
