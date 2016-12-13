import passport from 'passport';
import Strategy from 'passport-strategy';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jsonwebtoken from 'jsonwebtoken';
import ExtendableError from 'es6-error';
import { secret, googleClientId } from '../config';

const GOOGLE_CLIENT_SECRET = 'ccvqAqqEsluc5Ha1P8ZkXU1F';

export class AuthorizationError extends ExtendableError {
  name = 'AuthorizationError';

  message = 'Authorization error';

  constructor(message) {
    super();

    Object.assign(this, { message });
  }
}

export function createRefreshToken(payload) {
  return jsonwebtoken.sign(payload, secret, { noTimestamp: true });
}

export function createToken(payload) {
  return jsonwebtoken.sign(payload, secret, { expiresIn: '5h' });
}

export function checkRefreshToken(refreshToken) {
  return jsonwebtoken.verify(refreshToken, secret);
}

class JWTRefreshToken extends Strategy {
  name = 'jwt-refresh-token';

  authenticate(req) {
    const { headers: { Authorization, authorization } } = req;
    const token = Authorization || authorization;

    if (token) {
      try {
        const user = jsonwebtoken.verify(token, secret);

        this.success(user);
      } catch (error) {
        this.error(new AuthorizationError('Invalid token'));
      }
    } else {
      this.error(new AuthorizationError('Unauthorized'));
    }
  }
}

passport.use(new JWTRefreshToken());

passport.use(new GoogleStrategy({
  clientID: googleClientId,
  clientSecret: GOOGLE_CLIENT_SECRET,
}, (accessToken, refreshToken, profile, done) => {
  const {
    displayName: name,
    emails: [{ value: email }],
  } = profile;

  const user = {
    name,
    email,
  };

  done(null, user);
}));

export function checkJWTToken(req, res, next) {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt-refresh-token', { session: false }, (error, user) => {
      if (error) {
        reject(error);
      } else if (user) {
        resolve(user);
      }
    })(req, res, next);
  });
}
