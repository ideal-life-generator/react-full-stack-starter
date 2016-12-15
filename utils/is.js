import isEmail from 'validator/lib/isEmail';
import is, { createValidation } from './is-core';

export function required(value) {
  if (!value) {
    return 'Required';
  }

  return undefined;
}

export function minLength(min) {
  return ({ length }) => {
    if (length < min) {
      return `Must be ${min} characters or more`;
    }

    return undefined;
  };
}

export function validEmail(value) {
  if (!isEmail(value)) {
    return 'Invalid';
  }

  return undefined;
}

export const name = is(required, minLength(2));
export const email = is(required, validEmail);
export const password = is(required, minLength(6));
export const refreshToken = is(required);
export const code = is(required);

export const signupValidation = createValidation({
  name,
  email,
  password,
});

export const loginValidation = createValidation({
  email,
  password,
});

export const createTokenValidation = createValidation({
  refreshToken,
});

export const googleOAuth2Validation = createValidation({
  code,
});
