import { checkRefreshToken, createToken, AuthorizationError } from '../authorization';
import { createTokenValidation } from '../../utils/is';

export async function POST({ body: { refreshToken } }) {
  try {
    const payload = checkRefreshToken(refreshToken);

    return {
      token: createToken(payload),
    };
  } catch (error) {
    throw new AuthorizationError('Invalid refresh token');
  }
}

POST.validate = createTokenValidation;
