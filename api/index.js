import { listen as listenServer } from './api';
import { connect as databaseConnect } from './database';
import { apiPort, mongoDBServer } from '../config';

(async () => {
  await databaseConnect(mongoDBServer);
  await listenServer(apiPort);
})();
