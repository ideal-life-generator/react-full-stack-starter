import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router, browserHistory, match } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import initTheme from '../src/theme';
import initStore from './store';
import routes from './routes';

const { env: { NODE_ENV, RENDERING_ON } } = process;

injectTapEventPlugin();

const theme = initTheme(navigator.userAgent);
const store = initStore(window.INITIAL_STATE);

function renderApp() {
  render(
    <AppContainer>
      <MuiThemeProvider muiTheme={theme}>
        <Provider store={store}>
          <Router
            history={browserHistory}
            routes={routes}
          />
        </Provider>
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('app'),
  );
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});

if (NODE_ENV === 'development' && RENDERING_ON === 'browser') {
  if (module.hot) {
    module.hot.accept('./routes', () => {
      require('./routes');

      renderApp();
    });
  }
}
