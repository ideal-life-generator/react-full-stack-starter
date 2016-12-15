import { resolve } from 'path';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import cookie from 'react-cookie';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';
import initStore from './store';
import initTheme from './theme';
import { serverPort } from '../config';
import indexHtml from './index.html';
import rootStyles from './styles/root.scss';
import './styles/common.scss';

const { env: { NODE_ENV } } = process;

const server = express();

server.use(compression());
server.use(cors());
server.use(express.static(resolve('build')));

injectTapEventPlugin();

function renderPage(html, initialState) {
  return (
    indexHtml
      .replace('<!-- HTML -->', html)
      .replace('<!-- INITIAL_STATE -->', `
        <script>
          window.INITIAL_STATE = ${JSON.stringify(initialState)};
        </script>
      `)
  );
}

server.get('*', (req, res, next) => {
  match({ routes, location: req.url }, async (routerError, redirect, props) => {
    try {
      if (routerError) {
        throw routerError;
      } else if (redirect) {
        const { pathname, search } = redirect;
        const redirectPath = `${pathname}${search}`;

        res.redirect(redirectPath);
      } else if (props) {
        const { headers: { 'user-agent': userAgent } } = req;

        cookie.plugToRequest(req, res);

        const store = initStore();
        const theme = initTheme(userAgent);

        await loadOnServer({ ...props, store });

        const initialState = store.getState();

        const content = renderToString(
          <MuiThemeProvider muiTheme={theme}>
            <Provider store={store}>
              <div className={rootStyles.rootWrap}>
                <ReduxAsyncConnect {...props} />
              </div>
            </Provider>
          </MuiThemeProvider>,
        );

        const html = renderPage(content, initialState);

        res.send(html);
      }

      next();
    } catch ({ message }) {
      res.status(400).send(message);
    }
  });
});

server.listen(serverPort, () => {
  console.log(`Rendering server is listen on ${serverPort} port in ${NODE_ENV} mode.`);
});
