import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import initTheme from './theme';
import initStore from './store';
import routes from './routes';
import App from './containers/App';

const theme = initTheme(navigator.userAgent);
const store = initStore(window.INITIAL_STATE);

const { env: { NODE_ENV, RENDERING_ON } } = process;

injectTapEventPlugin();

function renderApp() {
  render(
    <App
      theme={theme}
      store={store}
      routes={routes}
    />,
    document.getElementById('app'),
  );
}

if (NODE_ENV === 'development' && RENDERING_ON === 'client') {
  if (module.hot) {
    module.hot.accept('./routes', () => {
      require('./routes');

      renderApp();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
