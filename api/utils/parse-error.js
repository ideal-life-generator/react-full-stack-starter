import { Error } from 'mongoose';
import { StatusCodeError } from 'request-promise/errors';
import { QueryError } from './parse-query';

const { ValidationError } = Error;

export default (error, defaultMessage) => {
  if (error instanceof ValidationError) {
    const { errors } = error;

    const result = Object.keys(errors).reduce((errorObject, fieldName) => {
      const { [fieldName]: { message } } = errors;

      errorObject[fieldName] = message;

      return errorObject;
    }, {});

    return result;
  } else if (error instanceof StatusCodeError) {
    const { response: result } = error;

    return result;
  } else if (error instanceof QueryError) {
    const { message } = error;

    return message;
  } else if (error instanceof Error) {
    const { message } = error;
    const result = defaultMessage || message;

    return result;
  }

  return error;
};
