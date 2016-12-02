import { SubmissionError } from 'redux-form';
import axios from '../utils/axios';

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
