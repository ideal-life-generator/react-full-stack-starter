import React, { Component, PropTypes } from 'react' ;
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import FormField from '../components/FormField';
import { login } from '../reducers/user';
import { loginValidation } from '../../utils/is';
import styles from '../styles/login.scss';

const { bool, string, func } = PropTypes;

@connect(() => ({
  initialValues: {
    email: 'ideal.life.generator@gmail.com',
    password: 'test password',
  },
}))

@reduxForm({
  form: 'login',
  validate: loginValidation,
})

export default class Login extends Component {
  static propTypes = {
    handleSubmit: func.isRequired,
    submitting: bool.isRequired,
    submitFailed: bool.isRequired,
    error: string,
  };

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.loginPending && !nextProps.loginPending && !nextProps.loginError) {
  //     // Login success, redirect the page here.
  //   }
  // }

  render() {
    const { props: { handleSubmit, submitting, submitFailed, error } } = this;

    return (
      <section className={styles.login}>
        <form className={styles.form}>
          <Field
            id="login-email"
            name="email"
            type="email"
            hintText="Email"
            component={FormField}
          />
          <br />
          <Field
            id="login-password"
            name="password"
            type="password"
            hintText="Password"
            component={FormField}
          />
          <br />
          <br />
          <RaisedButton
            label="Submit"
            onTouchTap={handleSubmit(login)}
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
