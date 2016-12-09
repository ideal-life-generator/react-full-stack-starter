import express from 'express';
import passport from 'passport';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import multipart from 'connect-multiparty';
import parseQuery from './utils/parse-query';
import parseError from './utils/parse-error';
import { throwIfInvalid } from '../utils/is-core';
import * as queries from './queries';
import { checkJWTToken } from './authorization';

const { env: { NODE_ENV } } = process;

const api = express();

api.use(compression());
api.use(cors());
api.use(bodyParser.json());
api.use(multipart());

api.use(passport.initialize());

api.use(async (req, res, next) => {
  try {
    const { url, method, body } = req;
    const handler = parseQuery(queries, url, method);
    const { secured, validate } = handler;

    if (secured) {
      const user = await checkJWTToken(req, res, next);

      Object.assign(req, { user });
    }

    if (validate) {
      throwIfInvalid(validate(body));
    }

    res.send(await handler(req, res, next));
  } catch (error) {
    const { status, data } = parseError(error, 'Not found');

    res.status(status).send(data);
  }
});

export function listen(apiPort) {
  return new Promise((resolve, reject) => {
    try {
      const server = api.listen(apiPort, () => {
        console.info(`API server is listen on ${apiPort} port in ${NODE_ENV} mode.`);

        resolve(() => {
          server.close();
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}

export default api;

// https://www.npmjs.com/package/http-errors
