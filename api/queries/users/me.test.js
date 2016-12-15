import { Types } from 'mongoose';
import api from '../../index.test';
import User from '../../database/User';
import { createToken } from '../../auth';

const { ObjectId } = Types;

const testData = new Map();

testData.set('userPayload', {
  name: 'Test Username',
  email: 'test@test.test',
  password: 'test_password',
  feedback: 'Test feedback',
});

suite('/users/me', () => {
  suiteSetup(async () => {
    const userPayload = testData.get('userPayload');
    const { email } = userPayload;

    const user = await User.findOneAndUpdate({ email }, userPayload, { upsert: true, new: true });
    const { _id } = user;

    testData.set('user', user);
    testData.set('token', createToken({ _id }));
    testData.set('notFoundToken', createToken({ _id: ObjectId('4edd40c86762e0fb12000003') }));
  });

  suiteTeardown(async () => {
    const { email } = testData.get('user');

    await User.findOneAndRemove({ email });
  });

  test('Should return user profile', async () => {
    const userPayload = testData.get('userPayload');
    const token = testData.get('token');

    const { body: { _id, name, feedback } } = await api.get('/users/me')
      .set('Authorization', token)
      .expect(200);

    _id.should.be.a.String();
    name.should.be.exactly(userPayload.name);
    feedback.should.be.exactly(userPayload.feedback);
  });

  test('Invalid token', async () => {
    await api.get('/users/me')
      .set('Authorization', 'Invalid token')
      .expect(401, 'Invalid token');
  });

  test('User not found', async () => {
    const token = testData.get('notFoundToken');

    await api.get('/users/me')
      .set('Authorization', token)
      .expect(404, 'User not found');
  });

  test('Unauthorized', async () => {
    await api.get('/users/me')
      .expect(401, 'Unauthorized');
  });
});
