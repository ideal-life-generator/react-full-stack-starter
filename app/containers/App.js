import React, { PropTypes } from 'react' ;
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DevTools from './DevTools';
import styles from '../styles/root.scss';

const { env: { NODE_ENV, RENDERING_ON } } = process;

const { object, element } = PropTypes;

export default function App({ theme, store, routes, history }) {
  if (NODE_ENV === 'development' && RENDERING_ON === 'client') {
    const { AppContainer } = require('react-hot-loader');

    return (
      <AppContainer>
        <MuiThemeProvider muiTheme={theme}>
          <Provider store={store}>
            <div className={styles.rootWrap}>
              <Router
                history={history}
                routes={routes}
                render={props => (
                  <ReduxAsyncConnect {...props} filter={item => !item.deferred} />
                )}
              />
              <DevTools />
            </div>
          </Provider>
        </MuiThemeProvider>
      </AppContainer>
    );
  }

  return (
    <MuiThemeProvider muiTheme={theme}>
      <Provider store={store}>
        <div className={styles.rootWrap}>
          <Router
            history={history}
            routes={routes}
            render={props => (
              <ReduxAsyncConnect {...props} filter={item => !item.deferred} />
            )}
          />
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  theme: object.isRequired,
  store: object.isRequired,
  routes: element.isRequired,
  history: object.isRequired,
};
