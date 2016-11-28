import React, { PropTypes } from 'react' ;
import TextField from 'material-ui/TextField';

const { bool, string, shape } = PropTypes;

export default function FormField({ input, meta: { touched, error }, ...props }) {
  return (
    <TextField
      {...input}
      {...props}
      errorText={touched && error && error}
    />
  );
}

FormField.propTypes = {
  input: shape({
    name: string.isRequired,
    value: string,
  }).isRequired,
  meta: shape({
    touched: bool.isRequired,
    error: string,
  }).isRequired,
};
