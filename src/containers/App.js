import React, { PropTypes } from 'react' ;
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DevTools from './DevTools';
import styles from '../styles/common.scss';

const { env: { NODE_ENV, RENDERING_ON } } = process;

const { object, element } = PropTypes;

export default function App({ theme, store, routes }) {
  if (NODE_ENV === 'development' && RENDERING_ON === 'client') {
    const { AppContainer } = require('react-hot-loader');

    return (
      <AppContainer>
        <MuiThemeProvider muiTheme={theme}>
          <Provider store={store}>
            <div className={styles.mainWrap}>
              <Router
                history={browserHistory}
                routes={routes}
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
        <div className={styles.mainWrap}>
          <Router
            history={browserHistory}
            routes={routes}
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
};
