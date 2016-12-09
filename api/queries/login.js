import User from '../database/User';
import { createRefreshToken, createToken, AuthorizationError } from '../authorization';
import { loginValidation } from '../../utils/is';
import throwIf from '../../utils/throw-if';

export async function POST({ body: { email, password } }) {
  const user = await User.findOne({ email, password }, 'name feedback');

  throwIf(!user, new AuthorizationError('User not found'));

  const userPublic = user.public();
  const { _id } = userPublic;

  return {
    ...userPublic,
    refreshToken: createRefreshToken({ _id }),
    token: createToken({ _id }),
  };
}

POST.validate = loginValidation;
