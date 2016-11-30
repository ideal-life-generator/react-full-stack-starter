import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import initStore from './store';
import initTheme from './theme';
import routes from './routes';
import App from './containers/App';
import './styles/common.scss';

const { env: { NODE_ENV, RENDERING_ON } } = process;

const { INITIAL_STATE } = window;

const store = initStore(INITIAL_STATE);
const theme = initTheme(navigator.userAgent);

injectTapEventPlugin();

function renderApp() {
  render(
    <App
      store={store}
      theme={theme}
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
