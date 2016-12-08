import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as userActions from '../reducers/user';

const { string, func, shape } = PropTypes;

@connect(undefined, dispatch => bindActionCreators({ logout: userActions.logout }, dispatch))

export default class User extends Component {
  static muiName = 'IconMenu';

  static propTypes = {
    iconStyle: shape({
      fill: string.isRequired,
      color: string.isRequired,
    }),
    logout: func.isRequired,
  };

  render() {
    const { props: { iconStyle, logout } } = this;

    return (
      <div>
        <IconMenu
          iconStyle={iconStyle}
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="Logout" onTouchTap={logout} />
        </IconMenu>
      </div>
    );
  }
}
