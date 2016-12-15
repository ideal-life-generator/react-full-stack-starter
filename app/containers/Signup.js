import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import FormField from '../components/FormField';
import GooglePlusIcon from '../components/GooglePlusIcon';
import { signup } from '../state/user';
import * as oauth2Actions from '../state/oauth2';
import { signupValidation } from '../../utils/is';
import styles from '../styles/signup.scss';

const { bool, string, func, object, shape } = PropTypes;

@connect(({ oauth2 }) => ({ oauth2 }), dispatch => bindActionCreators({ handleOAuth2: oauth2Actions.handler }, dispatch))

@reduxForm({
  form: 'signup',
  validate: signupValidation,
})

export default class Signup extends Component {
  static propTypes = {
    handleSubmit: func.isRequired,
    submitting: bool.isRequired,
    submitFailed: bool.isRequired,
    error: string,
    oauth2: shape({
      google: shape({
        isFetched: bool.isRequired,
        isFailure: bool.isRequired,
        errorData: object,
      }).isRequired,
    }).isRequired,
    handleOAuth2: func.isRequired,
  };

  handleGoogleOAuth2 = () => {
    const { props: { handleOAuth2 } } = this;

    handleOAuth2('google');
  }

  render() {
    const { handleGoogleOAuth2, props: { handleSubmit, submitting, submitFailed, error, oauth2 } } = this;

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
            primary
          />
          <br />
          <Divider style={{ width: '100%' }} />
          <br />
          <RaisedButton
            label="Google"
            labelPosition="before"
            icon={oauth2.google.isFetched ? <CircularProgress size={24} /> : <GooglePlusIcon />}
            onTouchTap={handleGoogleOAuth2}
            disabled={submitting}
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
