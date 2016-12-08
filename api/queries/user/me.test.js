import api from '../../index.test';
import User from '../../database/User';
import { createToken } from '../../authorization';

const testData = new Map();

testData.set('userPayload', {
  name: 'Test Username',
  email: 'test@test.test',
  password: 'test_password',
  feedback: 'Test feedback',
});

suite('/user/me', () => {
  suiteSetup(async () => {
    const userPayload = testData.get('userPayload');
    const { email } = userPayload;

    const user = await User.findOneAndUpdate({ email }, userPayload, { upsert: true, new: true });
    const { _id } = user;

    testData.set('user', user);
    testData.set('token', createToken({ _id }));
  });

  suiteTeardown(async () => {
    const { email } = testData.get('user');

    await User.findOneAndRemove({ email });
  });

  test('Should return user profile', async () => {
    const userPayload = testData.get('userPayload');
    const token = testData.get('token');

    const { body: { _id, name, feedback } } = await api.get('/user/me')
      .set('Authorization', token)
      .expect(200);

    _id.should.be.a.String();
    name.should.be.exactly(userPayload.name);
    feedback.should.be.exactly(userPayload.feedback);
  });

  test('Unauthorized', async () => {
    await api.get('/user/me')
      .expect(401, 'Unauthorized');
  });
});
