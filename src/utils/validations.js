export function name(value) {
  if (!value) {
    return 'Required';
  } else if (value.length < 2) {
    return 'Must be 2 characters or more';
  }
}

export function email(value) {
  if (!value) {
    return 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function password(value) {
  if (!value) {
    return 'Required';
  } else if (value.length < 6) {
    return 'Must be 6 characters or more';
  }
}
