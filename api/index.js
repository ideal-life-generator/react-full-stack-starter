import express from 'express';
import compression from 'compression';
import cors from 'cors';
import multipart from 'connect-multiparty';
import findHandler from './utils/find-handler';
import * as queries from './queries';
import { apiPort } from '../config';

const { env: { NODE_ENV } } = process;

const app = express();

app.use(compression());
app.use(cors());
app.use(multipart());

app.use(async (req, res) => {
  try {
    const { url, method } = req;
    const handler = findHandler(queries, url, method);

    const result = await handler(req);

    res.send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).end(error.message);
    } else {
      res.status(400).send(error);
    }
  }
});

app.listen(apiPort, () => {
  console.log(`API server is listen on ${apiPort} port in ${NODE_ENV} mode.`);
});
