import api from '../index.test';
import User from '../database/User';

const testData = new Map();

testData.set('signupForm', {
  name: 'Test Username',
  email: 'test@test.test',
  password: 'test_password',
  feedback: 'Test feedback',
});

testData.set('invalidSignupForm', {
  name: 'i',
  email: 'invalid email',
  password: 'inv',
});

suite('/signup', () => {
  suiteSetup(async () => {
    const { email } = testData.get('signupForm');

    await User.findOneAndRemove({ email });
  });

  test('Should create new user', async () => {
    const signupForm = testData.get('signupForm');

    const { body: { _id, name, email, password, feedback, refreshToken, token } } = await api.post('/signup')
      .field('name', signupForm.name)
      .field('email', signupForm.email)
      .field('password', signupForm.password)
      .field('feedback', signupForm.feedback)
      .expect(200);

    _id.should.be.a.String();
    name.should.be.exactly(signupForm.name);
    feedback.should.be.exactly(signupForm.feedback);
    refreshToken.should.be.a.String();
    token.should.be.a.String();
  });

  test('Required fields', async () => {
    await api.post('/signup')
      .expect(400, {
        name: 'Required',
        email: 'Required',
        password: 'Required',
      });
  });

  test('Min length and email invalid', async () => {
    const { name, email, password } = testData.get('invalidSignupForm');

    await api.post('/signup')
      .field('name', name)
      .field('email', email)
      .field('password', password)
      .expect(400, {
        name: 'Must be 2 characters or more',
        email: 'Invalid',
        password: 'Must be 6 characters or more',
      });
  });

  test('Email already in use', async () => {
    const { name, email, password } = testData.get('signupForm');

    await api.post('/signup')
      .field('name', name)
      .field('email', email)
      .field('password', password)
      .expect(400, { email: 'Already in use' });
  });
});
