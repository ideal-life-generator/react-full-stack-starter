import React, { Component } from 'react' ;
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as validations from '../utils/validations';
import FormField from '../components/FormField';
import classes from '../styles/signup.scss';

function validate({ name, email, password }) {
  return {
    name: validations.name(name),
    email: validations.email(email),
    password: validations.password(password),
  };
};

@reduxForm({
  form: 'signup',
  validate,
  onSubmit(values) {
    console.log(values);
  },
})

export default class Signup extends Component {
  static title = 'Signup';

  render() {
    const { props: { handleSubmit, pristine, reset, submitting } } = this;

    return (
      <section className={classes.signup}>
        <form className={classes.form}>
          <Field
            name="name"
            hintText="Name"
            component={FormField}
          />
          <br />
          <Field
            name="email"
            type="email"
            hintText="Email"
            component={FormField}
          />
          <br />
          <Field
            name="password"
            type="password"
            hintText="Password"
            component={FormField}
          />
          <br />
          <Field
            name="feedback"
            hintText="Feedback"
            component={FormField}
            multiLine
          />
          <br />
          <br />
          <RaisedButton
            label="Submit"
            onTouchTap={handleSubmit}
            disabled={submitting}
            style={{ color: 'black' }}
            primary
          />
        </form>
      </section>
    );
  }
}
