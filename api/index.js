import express from 'express';
import compression from 'compression';
import cors from 'cors';
import * as actions from './actions';

const { env: { NODE_ENV } } = process;

const app = express();

app.use(compression());
app.use(cors());

function removeSlash(url) {
  const isStartedFromSlash = url.indexOf('/') === 0;

  if (isStartedFromSlash) {
    const withoutSlash = url.slice(1);

    return withoutSlash;
  } else {
    return url;
  }
}

function findAction(actions, url, method) {
  const urlWithoutSlash = removeSlash(url);

  if (urlWithoutSlash) {
    const actionMethods = actions[urlWithoutSlash];

    if (actionMethods) {
      const action = actionMethods[method];

      return action;
    }
  }
};

app.use(async ({ url, method }, res, next) => {
  const action = findAction(actions, url, method);

  if (action) {
    try {
      const actionResult = await action();

      res.send(actionResult);
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    res.status(404).end('Not found.');
  }
});

app.listen(5001, () => {
  console.log(`API server is listen on ${5001} port in ${NODE_ENV} mode.`);
});
