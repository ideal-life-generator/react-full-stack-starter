import { createRefreshToken, createToken } from '../../authorization';
import { signupValidation } from '../../../utils/is';

export async function POST({ User }, { body: { name, email, password, feedback } }) {
  const newUser = await User.create({ name, email, password, feedback });
  const newUserPublic = newUser.public();
  const { _id } = newUserPublic;

  return {
    ...newUserPublic,
    refreshToken: createRefreshToken({ _id }),
    token: createToken({ _id }),
  };
}

POST.validate = signupValidation;
