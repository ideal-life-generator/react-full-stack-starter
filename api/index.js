import express from 'express';
import compression from 'compression';
import cors from 'cors';
import findHandler from './utils/find-handler';
import * as queries from './queries';

const { env: { NODE_ENV } } = process;

const app = express();

app.use(compression());
app.use(cors());

app.use(async ({ url, method }, res, next) => {
  const handler = findHandler(queries, url, method);

  if (handler) {
    try {
      const result = await handler();

      res.send(result);
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
