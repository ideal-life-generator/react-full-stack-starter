import React, { Component, PropTypes } from 'react' ;
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import * as validations from '../utils/validations';
import FormField from '../components/FormField';
import styles from '../styles/signup.scss';

const { bool, func } = PropTypes;

function validate({ name, email, password }) {
  return {
    name: validations.name(name),
    email: validations.email(email),
    password: validations.password(password),
  };
}

@reduxForm({
  form: 'signup',
  validate,
  onSubmit(values) {
    console.log(values);
  },
})

export default class Signup extends Component {
  static title = 'Signup';

  static propTypes = {
    handleSubmit: func.isRequired,
    submitting: bool.isRequired,
  };

  render() {
    const { props: { handleSubmit, submitting } } = this;

    return (
      <section className={styles.signup}>
        <form className={styles.form}>
          <Field
            id="signup-name"
            name="name"
            hintText="Name"
            component={FormField}
          />
          <br />
          <Field
            id="signup-email"
            name="email"
            type="email"
            hintText="Email"
            component={FormField}
          />
          <br />
          <Field
            id="signup-password"
            name="password"
            type="password"
            hintText="Password"
            component={FormField}
          />
          <br />
          <Field
            id="signup-feedback"
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
