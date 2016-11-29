import { resolve } from 'path';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';
import initStore from './store';
import initTheme from './theme';
import styles from './styles/root.scss';
import './styles/common.scss';

const { env: { NODE_ENV } } = process;

const app = express();

app.use(compression());
app.use(cors());
app.use(express.static(resolve('dist')));

injectTapEventPlugin();

function renderPage(appHtml, initialState) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>React Full Stack Starter</title>
        <script>
          window.INITIAL_STATE = ${JSON.stringify(initialState)};
        </script>
        <script src="/commons.js"></script>
        <script src="/client.js"></script>
      </head>
      <body>
        <div id="app">${appHtml}</div>
      </body>
    </html>
  `;
}

app.get('*', (req, res, next) => {
  const store = initStore();

  match({ routes, location: req.url }, async (err, redirect, props) => {
    if (err) {
      res.status(400).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      const theme = initTheme(req.headers['user-agent']);

      await loadOnServer({ ...props, store });

      // global.navigator = { userAgent: req.headers['user-agent'] };

      const content = renderToString(
        <MuiThemeProvider muiTheme={theme}>
          <Provider store={store}>
            <div className={styles.rootWrap}>
              <ReduxAsyncConnect {...props} />
            </div>
          </Provider>
        </MuiThemeProvider>,
      );

      const initialState = store.getState();

      const html = renderPage(content, initialState);

      res.send(html);

      // /* const asyncActions = */props.components.map((component/* { asyncAction } */) => {
      //   return console.log(component);
      //   // if (asyncAction) {
      //   //   return store.dispatch(asyncAction());
      //   // }

      //   // return undefined;
      // });

      // await Promise.all(asyncActions);
    } else {
      next();
    }
  });
});

app.listen(5000, () => {
  console.log(`Rendering server is listen on ${5000} port in ${NODE_ENV} mode.`);
});

// https://github.com/erikras/react-redux-universal-hot-example/pull/1140/files#r62427816
