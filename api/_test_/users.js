import { ok, equal } from 'assert';
import User from '../models/User';
import request from '../utils/request';
import { api } from '../utils/make-url';

const testData = new Map();

testData.set('userPayload', {
  name: 'Test Username',
  email: 'test@email.test',
  password: 'test_password',
  feedback: 'Test feedback',
});

describe('/users', () => {
  before(async () => {
    const userPayload = testData.get('userPayload');
    const { email } = userPayload;

    const user = await User.findOneAndUpdate({ email }, userPayload, { upsert: true, new: true });

    testData.set('user', user);
  });

  after(async () => {
    const { email } = testData.get('user');

    await User.findOneAndRemove({ email });
  });

  it('Should return users collection', async () => {
    try {
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
      } = await request(api('users'));

      equal(status, 200, 'Status should be 200');
      ok(data instanceof Object, 'Data should be an object');
      ok(collection instanceof Array, 'Collection should be an array');
      ok(length > 0, 'Collection should not be empty');
      ok(user instanceof Object, 'User should be an object');
      equal(typeof _id, 'string', 'Id should be a string');
      equal(typeof name, 'string', 'Name should be a string');
      equal(typeof email, 'undefined', 'Email should be hidden');
      equal(typeof password, 'undefined', 'Password should be hidden');
      equal(typeof feedback, 'string', 'Feedback should be a string');
    } catch (error) {
      throw error;
    }
  });
});
