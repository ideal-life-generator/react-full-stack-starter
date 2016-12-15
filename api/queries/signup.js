import User from '../database/User';
import { createRefreshToken, createToken } from '../auth';
import { signupValidation } from '../../utils/is';

export async function POST({ req: { body: { name, email, password, feedback } } }) {
  const user = await User.create({ name, email, password, feedback });

  const userPublic = user.public();

  const { _id } = userPublic;

  return {
    ...userPublic,
    refreshToken: createRefreshToken({ _id }),
    token: createToken({ _id }),
  };
}

POST.validate = signupValidation;
