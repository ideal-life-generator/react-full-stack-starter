import { Error } from 'mongoose';
import { QueryError } from './parse-query';
import { IsInvalidError } from '../../utils/is-core';
import { AuthorizationError } from '../authorization';

const { ValidationError } = Error;

export default (error, defaultMessage) => {
  const { message } = error;

  if (error instanceof ValidationError) {
    const { errors } = error;

    const formErrors = Object.keys(errors).reduce((errorObject, fieldName) => {
      const { [fieldName]: { filedMessage } } = errors;

      return Object.assign(errorObject, { [fieldName]: filedMessage });
    }, {});

    return {
      status: 400,
      data: formErrors,
    };
  } else if (error instanceof QueryError) {
    return {
      status: 400,
      data: message,
    };
  } else if (error instanceof IsInvalidError) {
    const { errors } = error;

    return {
      status: 400,
      data: errors,
    };
  } else if (error instanceof AuthorizationError) {
    return {
      status: 401,
      data: message,
    };
  }

  return {
    status: 404,
    data: message || defaultMessage,
  };
};
