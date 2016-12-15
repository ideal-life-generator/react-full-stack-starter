import { checkRefreshToken, createToken, AuthError } from '../auth';
import { createTokenValidation } from '../../utils/is';

export async function POST({ req: { body: { refreshToken } } }) {
  try {
    const payload = checkRefreshToken(refreshToken);

    return {
      token: createToken(payload),
    };
  } catch (error) {
    throw new AuthError('Invalid refresh token');
  }
}

POST.validate = createTokenValidation;
