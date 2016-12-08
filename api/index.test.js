import supertest from 'supertest-as-promised';
import api from './api';
import { connect as databaseConnect } from './database';
import { mongoDBServer } from '../config';

export default supertest(api);

const testData = new Map();

suiteSetup(async () => {
  const databaseDisconnect = await databaseConnect(mongoDBServer);

  console.log();

  testData.set('databaseDisconnect', databaseDisconnect);
});

suiteTeardown(async () => {
  const databaseDisconnect = testData.get('databaseDisconnect');

  await databaseDisconnect();
});
