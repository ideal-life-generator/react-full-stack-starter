import { ok, equal, ifError } from 'assert';
import { connectDatabase, listenServer } from '../server';
import User from '../models/User';
import axios from '../../app/utils/axios';
import { apiTestPort, mongoDBServer } from '../../config';

const testData = new Map();

testData.set('userPayload', {
  name: 'Test Username',
  email: 'test@email.test',
  password: 'test_password',
  feedback: 'Test feedback',
});

before(async () => {
  const closeMongoDB = await connectDatabase(mongoDBServer);
  const closeServer = await listenServer(apiTestPort);

  const userPayload = testData.get('userPayload');
  const { email } = userPayload;

  const user = await User.findOneAndUpdate({ email }, userPayload, { upsert: true, new: true });

  testData.set('closeMongoDB', closeMongoDB);
  testData.set('closeServer', closeServer);
  testData.set('user', user);
});

after(async () => {
  const { _id } = testData.get('user');
  const closeMongoDB = testData.get('closeMongoDB');
  const closeServer = testData.get('closeServer');

  await User.findOneAndRemove({ _id });

  closeMongoDB();
  closeServer();
});

describe('/users', () => {
  it('Should return users collection', async () => {
    const {
      status,
      data,
      data: {
        collection,
        collection: {
          length,
          0: user,
          0: { _id, name, email, password, feedback },
        },
      },
    } = await axios('/users');

    equal(status, 200, 'Status should be 200');
    ok(data instanceof Object, 'Data should be an object');
    ok(collection instanceof Array, 'Collection should be array');
    ok(length > 0, 'Collection should not be empty');
    ok(user instanceof Object, 'User should be an object');
    ok(typeof _id === 'string', 'Id should be a string');
    ok(typeof name === 'string', 'Name should be a string');
    ifError(email, 'Email should be hided');
    ifError(password, 'Password should be hided');
    ok(typeof feedback === 'string', 'Feedback should be a string');
  });
});
