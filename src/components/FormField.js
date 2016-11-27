import React, { Component } from 'react' ;
import TextField from 'material-ui/TextField';

export default function FormField({ input, meta: { touched, error, warning }, ...props }) {
  return (
    <TextField
      {...input}
      {...props}
      errorText={touched && error && error}
    />
  );
}
