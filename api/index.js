import { connectDatabase, listenServer } from './server';
import { apiPort, mongoDBServer } from '../config';

(async () => {
  await connectDatabase(mongoDBServer);
  await listenServer(apiPort);
})();
