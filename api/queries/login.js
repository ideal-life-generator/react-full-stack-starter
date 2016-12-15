import User from '../database/User';
import { createRefreshToken, createToken, AuthError } from '../auth';
import { loginValidation } from '../../utils/is';
import throwIf from '../../utils/throw-if';

export async function POST({ req: { body: { email, password } } }) {
  const user = await User.findOne({ email, password }, 'name feedback');

  throwIf(!user, new AuthError('User not found'));

  const userPublic = user.public();

  const { _id } = userPublic;

  return {
    ...userPublic,
    refreshToken: createRefreshToken({ _id }),
    token: createToken({ _id }),
  };
}

POST.validate = loginValidation;
