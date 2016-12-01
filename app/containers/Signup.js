import React, { Component, PropTypes } from 'react' ;
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import FormField from '../components/FormField';
import { signupValidation, signup } from '../controllers/user';
import styles from '../styles/signup.scss';

const { bool, string, func } = PropTypes;

@connect(() => ({
  initialValues: {
    name: 'Tkachenko Vladislav',
    email: 'ideal.life.generator@gmail.com',
    password: 'test password',
    feedback: 'It\'s fine!',
  },
}))

@reduxForm({
  form: 'signup',
  validate: signupValidation,
})

export default class Signup extends Component {
  static title = 'Signup';

  static propTypes = {
    handleSubmit: func.isRequired,
    submitting: bool.isRequired,
    submitFailed: bool.isRequired,
    error: string,
  };

  render() {
    const { props: { handleSubmit, submitting, submitFailed, error } } = this;

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
            onTouchTap={handleSubmit(signup)}
            disabled={submitting}
            style={{ color: 'black' }}
            primary
          />
        </form>
        <Snackbar
          className={styles.errorBox}
          open={submitFailed && !!error}
          message={error || ''}
          autoHideDuration={5000}
        />
      </section>
    );
  }
}
