import api from '../index.test';
import User from '../database/User';

const testData = new Map();

testData.set('userPayload', {
  name: 'Test Username',
  email: 'test@test.test',
  password: 'test password',
  feedback: 'Test feedback',
});

testData.set('invalidLoginForm', {
  email: 'invalid email',
  password: 'inval',
});

testData.set('failedLoginForm', {
  email: 'failed@failed.failed',
  password: 'failed password',
});

suite('/login', () => {
  suiteSetup(async () => {
    const userPayload = testData.get('userPayload');
    const { email } = userPayload;

    const user = await User.findOneAndUpdate({ email }, userPayload, { upsert: true, new: true });

    testData.set('user', user);
  });

  suiteTeardown(async () => {
    const { email } = testData.get('user');

    await User.findOneAndRemove({ email });
  });

  test('Should return user profile', async () => {
    const userPayload = testData.get('userPayload');

    const { body: { _id, name, feedback, refreshToken, token } } = await api.post('/login')
      .field('email', userPayload.email)
      .field('password', userPayload.password);

    _id.should.be.a.String();
    name.should.be.exactly(userPayload.name);
    feedback.should.be.exactly(userPayload.feedback);
    refreshToken.should.be.a.String();
    token.should.be.a.String();
  });

  test('Required fields', async () => {
    await api.post('/login')
      .expect(400, {
        email: 'Required',
        password: 'Required',
      });
  });

  test('Invalid fields', async () => {
    const { email, password } = testData.get('invalidLoginForm');

    await api.post('/login')
      .field('email', email)
      .field('password', password)
      .expect(400, {
        email: 'Invalid',
        password: 'Must be 6 characters or more',
      });
  });

  test('Authorization failed', async () => {
    const { email, password } = testData.get('failedLoginForm');

    await api.post('/login')
      .field('email', email)
      .field('password', password)
      .expect(401, 'User not found');
  });
});
