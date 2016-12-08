import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

const { string, number, shape } = PropTypes;

export default class Authorization extends Component {
  static muiName = 'FlatButton';

  static propTypes = {
    style: shape({
      color: string.isRequired,
      marginTop: number.isRequired,
    }),
  };

  render() {
    const { props: { style } } = this;

    return (
      <div>
        <FlatButton
          style={style}
          containerElement={<Link to="/login" />}
          label="Login"
        />
        <FlatButton
          style={style}
          containerElement={<Link to="/signup" />}
          label="Signup"
        />
      </div>
    );
  }
}
