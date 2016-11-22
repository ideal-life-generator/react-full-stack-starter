import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from '../src/routes';
import store from '../src/store';
import initTheme from '../src/theme';

injectTapEventPlugin();

function renderPage(appHtml, initialState) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>React Starter Kit</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div id="app">${appHtml}</div>

        <script>
          window.INITIAL_STATE = ${JSON.stringify(initialState)};
        </script>
        <script src="/commons.js"></script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;
}

export default () => {
  return (req, res, next) => {
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
              <RouterContext {...props} />
            </Provider>
          </MuiThemeProvider>
        );

        res.send(renderPage(appHtml, initialState));
      } else {
        next();
      }
    });
  };
}
