import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import multipart from 'connect-multiparty';
import findHandler from './utils/find-handler';
import * as queries from './queries';
import * as models from './models';

const { env: { NODE_ENV } } = process;

const app = express();

app.use(compression());
app.use(cors());
app.use(multipart());

app.use(async (req, res) => {
  try {
    const { url, method } = req;
    const handler = findHandler(queries, url, method);

    const result = await handler(models, req, res);

    res.send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).end(error.message);
    } else {
      res.status(400).send(error);
    }
  }
});

mongoose.Promise = global.Promise;

export const connectDatabase = mongoDBServer => new Promise((resolve, reject) => {
  try {
    const database = mongoose.connect(mongoDBServer, (error) => {
      if (error) {
        throw error;
      }

      console.log(`MongoDB is connected to ${mongoDBServer} server.`);

      resolve(() => {
        database.disconnect();
      });
    });
  } catch (error) {
    reject(error);
  }
});

export const listenServer = apiPort => new Promise((resolve, reject) => {
  try {
    const server = app.listen(apiPort, (error) => {
      if (error) {
        throw error;
      }

      console.log(`API server is listen on ${apiPort} port in ${NODE_ENV} mode.`);

      resolve(() => {
        server.close();
      });
    });
  } catch (error) {
    reject(error);
  }
});
