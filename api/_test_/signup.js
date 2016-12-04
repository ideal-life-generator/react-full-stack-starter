import { ok, equal } from 'assert';
import User from '../models/User';
import request from '../utils/request';
import { api } from '../utils/make-url';
import parseError from '../utils/parse-error';

const testData = new Map();

testData.set('signupForm', {
  name: 'Test Username',
  email: 'test@test.test',
  password: 'test_password',
  feedback: 'Test feedback',
});

testData.set('signupInvalidForm', {
  name: 'i',
  email: 'invalid email',
  password: 'inv',
});

describe('/user/signup', () => {
  before(async () => {
    const { email } = testData.get('signupForm');

    await User.findOneAndRemove({ email });
  });

  describe('Should be invalid', () => {
    it('Required fields', async () => {
      try {
        await request.post(api('user/signup'));
      } catch (error) {
        const {
          status,
          data,
          data: { name, email, password },
        } = parseError(error);

        equal(status, 400, 'Status should be 400');
        ok(data instanceof Object, 'Data should be an object');
        equal(name, 'Required', 'Name should be required');
        equal(email, 'Required', 'Email should be required');
        equal(password, 'Required', 'Password should be required');
      }
    });

    it('Min length and email invalid', async () => {
      try {
        const signupInvalidForm = testData.get('signupInvalidForm');

        await request.post({
          url: api('user/signup'),
          formData: signupInvalidForm,
        });
      } catch (error) {
        const {
          status,
          data,
          data: { name, email, password },
        } = parseError(error);

        equal(status, 400, 'Status should be 400');
        ok(data instanceof Object, 'Data should be an object');
        equal(name, 'Must be 2 characters or more', 'Name should be "Must be 2 characters or more"');
        equal(email, 'Invalid', 'Email should be "Invalid"');
        equal(password, 'Must be 6 characters or more', 'Password should be "Must be 6 characters or more"');
      }
    });

    it('Email already in use', async () => {
      try {
        const signupForm = testData.get('signupForm');

        await request.post({
          url: api('user/signup'),
          formData: signupForm,
        });
      } catch (error) {
        const { status, data, data: { email } } = parseError(error);

        equal(status, 400, 'Status should be 400');
        ok(data instanceof Object, 'Data should be an object');
        equal(email, 'Already in use', 'Email should be "Already in use"');
      }
    });
  });

  it('Should create new user', async () => {
    try {
      const signupForm = testData.get('signupForm');
      const {
        status,
        data,
        data: { _id, name, email, password, feedback },
      } = await request.post({
        url: api('user/signup'),
        formData: signupForm,
      });

      equal(status, 200, 'Status should be 200');
      ok(data instanceof Object, 'Data should be an object');
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
