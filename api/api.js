import express from 'express';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import multipart from 'connect-multiparty';
import { models } from 'mongoose';
import authorization, { AuthorizationError } from './authorization';
import parseQuery from './utils/parse-query';
import parseError from './utils/parse-error';
import { throwIfInvalid } from '../utils/is-core';
import * as queries from './queries';

const { env: { NODE_ENV } } = process;

const api = express();

api.use(compression());
api.use(cors());
api.use(bodyParser.json());
api.use(multipart());

api.use(authorization());

api.use(async (req, res) => {
  try {
    const { url, method, body, user, authorizationError } = req;
    const handler = parseQuery(queries, url, method);
    const { secured, validate } = handler;

    if (validate) {
      throwIfInvalid(validate(body));
    }

    if (!secured || (secured && user)) {
      res.send(await handler(models, req, res));
    } else {
      throw authorizationError || new AuthorizationError();
    }
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
