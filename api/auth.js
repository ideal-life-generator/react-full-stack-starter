import jsonwebtoken from 'jsonwebtoken';
import ExtendableError from 'es6-error';
import { secret } from '../config';

export class AuthError extends ExtendableError {
  name = 'AuthError';

  message = 'Auth error';

  constructor(message) {
    super();

    Object.assign(this, { message });
  }
}

export function createRefreshToken(payload) {
  return jsonwebtoken.sign(payload, secret);
}

export function createToken(payload) {
  return jsonwebtoken.sign(payload, secret, { expiresIn: '1h' });
}

export function checkRefreshToken(refreshToken) {
  return jsonwebtoken.verify(refreshToken, secret);
}

export default function authenticate(req) {
  const { headers: { Authorization, authorization } } = req;
  const token = Authorization || authorization;

  if (token) {
    try {
      const user = jsonwebtoken.verify(token, secret);

      return user;
    } catch (error) {
      throw new AuthError('Invalid token');
    }
  }

  throw new AuthError('Unauthorized');
}
