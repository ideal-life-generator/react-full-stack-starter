import { Error } from 'mongoose';

const { ValidationError } = Error;

export default (error, defaultMessage) => {
  if (error instanceof ValidationError) {
    const { errors } = error;

    const result = {};
    Object.keys(errors).forEach((fieldName) => {
      const { [fieldName]: { message } } = errors;

      result[fieldName] = message;
    });

    return result;
  } else if (error instanceof Error) {
    return new Error(defaultMessage);
  }

  return error;
};
