import jsonwebtoken from 'jsonwebtoken';
import ExtendableError from 'es6-error';
import { secret } from '../config';

export class AuthorizationError extends ExtendableError {
  name = 'AuthorizationError';

  message = 'Authorization error';

  constructor(message) {
    super();

    Object.assign(this, { message });
  }
}

export default () => (req, res, next) => {
  const { headers: { Authorization, authorization } } = req;
  const token = Authorization || authorization;

  if (token) {
    try {
      const user = jsonwebtoken.verify(token, secret);

      Object.assign(req, { user });
    } catch (error) {
      Object.assign(req, { authorizationError: new AuthorizationError('Invalid token') });
    }
  } else {
    Object.assign(req, { authorizationError: new AuthorizationError('Unauthorized') });
  }

  next();
};

export function createRefreshToken(payload) {
  return jsonwebtoken.sign(payload, secret, { noTimestamp: true });
}

export function createToken(payload) {
  return jsonwebtoken.sign(payload, secret, { expiresIn: '5h' });
}

export function checkRefreshToken(refreshToken) {
  return jsonwebtoken.verify(refreshToken, secret);
}
