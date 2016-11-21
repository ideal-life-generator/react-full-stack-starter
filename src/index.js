import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, match } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';
import store from './store';
import initTheme from '../src/theme';
import './styles/common.scss';

injectTapEventPlugin();

const { location: { pathname, search, hash } } = window;
const location = `${pathname}${search}${hash}`;

match({ routes, location }, () => {
  // const history = syncHistoryWithStore(browserHistory, store);
  const theme = initTheme(navigator.userAgent);

  render(
    <MuiThemeProvider muiTheme={theme}>
      <Provider store={store}>
        <Router
          routes={routes}
          history={browserHistory}
        />
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('app'),
  );
});
