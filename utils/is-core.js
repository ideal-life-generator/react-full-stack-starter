import ExtendableError from 'es6-error';

export class IsInvalidError extends ExtendableError {
  name = 'IsInvalidError';
  message = 'Is invalid';

  constructor(errors) {
    super();

    Object.assign(this, { errors });
  }
}

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

    return undefined;
  };
}

export function createValidation(validators) {
  return fields => Object.keys(validators).reduce((container, field) => {
    const { [field]: value } = fields;
    const { [field]: validator } = validators;

    if (validator) {
      return Object.assign(container, { [field]: validator(value) });
    }

    return container;
  }, {});
}

export function throwIfInvalid(validationResult) {
  const isInvalid = Object.keys(validationResult).some((field) => {
    const { [field]: value } = validationResult;

    return value;
  });

  if (isInvalid) {
    throw new IsInvalidError(validationResult);
  }
}
