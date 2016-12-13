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
import createPopup from '../utils/popup';
import { url, googleClientId } from '../../config';
import styles from '../styles/signup.scss';

const redirectUrl = `${url}/oauth2.html?action=google`;

const googleOAuth2Url = 'https://accounts.google.com/o/oauth2/v2/auth?'
  + 'response_type=code&'
  + `client_id=${googleClientId}&`
  + `redirect_uri=${redirectUrl}&`
  + 'scope=https://www.googleapis.com/auth/plus.login&'
  + 'prompt=consent&'
  + 'include_granted_scopes=true&'
  + 'access_type=online&';

const { bool, string, func, object, shape } = PropTypes;

@connect(({ oauth2 }) => ({ oauth2 }), dispatch => bindActionCreators(oauth2Actions, dispatch))

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
  };

  componentDidMount() {
    const { oAuth2MessageHandler } = this;

    window.addEventListener('message', oAuth2MessageHandler);
  }

  componentWillUnmount() {
    const { oAuth2MessageHandler, state: { googleOAuth2Popup } } = this;

    if (googleOAuth2Popup) {
      googleOAuth2Popup.close();

      this.setState({ googleOAuth2Popup: null });
    }

    window.removeEventListener('message', oAuth2MessageHandler);
  }

  oAuth2MessageHandler = ({ origin, data }) => {
    if (origin === url) {
      const { action, code } = data;
      const { props: { [action]: oauth2Action } } = this;

      oauth2Action(action, { origin: redirectUrl, code });
    }
  }

  googleOAuth2 = () => {
    this.setState({
      googleOAuth2Popup: createPopup(googleOAuth2Url, { width: 450, height: 450 }),
    });
  }

  render() {
    const { googleOAuth2, props: { handleSubmit, submitting, submitFailed, error, oauth2 } } = this;

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
            hintText="feedback"
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
            onTouchTap={googleOAuth2}
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
