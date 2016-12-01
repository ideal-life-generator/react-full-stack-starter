import { SubmissionError } from 'redux-form';
import axios from './utils/axios';
import * as is from '../utils/is';

export function signupValidation({ name, email, password }) {
  return {
    name: is.name(name),
    email: is.email(email),
    password: is.password(password),
  };
}

export async function signup(values) {
  try {
    const { data: user } = await axios.post('user/signup', values);

    console.log(user);

    return user;
  } catch (error) {
    if (error.response.data) {
      throw new SubmissionError(error.response.data);
    } else {
      throw new SubmissionError({ _error: 'Submit error.' });
    }
  }
}
