import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import fetchMiddleware from './controllers/utils/fetchMiddleware';
import reducers from './controllers';

const { env: { NODE_ENV, RENDERING_ON } } = process;

function generateCompose(middlewares) {
  if (NODE_ENV === 'development' && RENDERING_ON === 'client') {
    const DevTools = require('./containers/DevTools').default;

    return compose(
      middlewares,
      DevTools.instrument(),
    );
  }

  return compose(
    middlewares,
  );
}

export default (initialState = {}) => {
  const store = createStore(
    reducers,
    initialState,
    generateCompose(
      applyMiddleware(
        fetchMiddleware,
        thunk,
      ),
    ),
  );

  if (NODE_ENV === 'development' && RENDERING_ON === 'client') {
    if (module.hot) {
      module.hot.accept('./controllers', () => {
        const nextReducers = require('./controllers').default;

        store.replaceReducer(nextReducers);
      });
    }
  }

  return store;
};
