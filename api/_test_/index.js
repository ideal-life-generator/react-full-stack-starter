import { connectDatabase, listenServer } from '../server';
import { apiTestPort, mongoDBServer } from '../../config';

const testData = new Map();

before(async () => {
  const closeMongoDB = await connectDatabase(mongoDBServer);
  const closeServer = await listenServer(apiTestPort);

  testData.set('closeMongoDB', closeMongoDB);
  testData.set('closeServer', closeServer);
});

after(async () => {
  const closeMongoDB = testData.get('closeMongoDB');
  const closeServer = testData.get('closeServer');

  closeMongoDB();
  closeServer();
});
