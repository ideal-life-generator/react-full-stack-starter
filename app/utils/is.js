import isEmail from 'validator/lib/isEmail';

export default function is(...validations) {
  return (value) => {
    const { length } = validations;

    for (let index = 0; index < length; index += 1) {
      const validation = validations[index];
      const validatonResult = validation(value);

      if (validatonResult) {
        return validatonResult;
      }
    }
  };
}

export function required(value) {
  if (!value) {
    return 'Required';
  }
}

export function minLength(length, min) {
  return length < min;
}

export function minLength2({ length }) {
  if (minLength(length, 2)) {
    return 'Must be 2 characters or more';
  }
}

export function minLength6({ length }) {
  if (minLength(length, 6)) {
    return 'Must be 2 characters or more';
  }
}

export function validEmail(value) {
  if (!isEmail(value)) {
    return 'Invalid';
  }
}

export const name = is(required, minLength2);
export const email = is(required, validEmail);
export const password = is(required, minLength6);
