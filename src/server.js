import { resolve } from 'path';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';
import initStore from './store';
import initTheme from './theme';
import styles from './styles/common.scss';

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
        <script src="/bundle.js"></script>
      </head>
      <body>
        <div id="app">${appHtml}</div>
      </body>
    </html>
  `;
}

app.get('*', (req, res, next) => {
  const store = initStore();
  const initialState = store.getState();

  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(400).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      const theme = initTheme(req.headers['user-agent']);

      const appHtml = renderToString(
        <MuiThemeProvider muiTheme={theme}>
          <Provider store={store}>
            <div className={styles.mainWrap}>
              <RouterContext {...props} />
            </div>
          </Provider>
        </MuiThemeProvider>,
      );

      res.send(renderPage(appHtml, initialState));
    } else {
      next();
    }
  });
});

app.listen(5000, () => {
  console.log(`Rendering server is listen on ${5000} port in ${NODE_ENV} mode.`);
});
