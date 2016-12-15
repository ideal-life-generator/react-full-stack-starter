import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import CircularProgress from 'material-ui/CircularProgress';
import User from './User';
import Authorization from './Authorization';
import MainMenuItem from '../components/MainMenuItem';
import * as uiActions from '../state/ui';
import { checkStoredUser } from '../state/user';
import styles from '../styles/root.scss';

const { bool, string, func, shape, element } = PropTypes;

@asyncConnect([{
  promise({ store: { getState, dispatch } }) {
    const { user: { isAuthenticated } } = getState();

    if (!isAuthenticated) {
      return dispatch(checkStoredUser());
    }

    return undefined;
  },
}])

@connect(({
  ui: { mainMenuOpened },
  user,
}) => ({
  mainMenuOpened,
  user,
}), dispatch => bindActionCreators({
  openMainMenu: uiActions.openMainMenu,
  closeMainMenu: uiActions.closeMainMenu,
}, dispatch))

export default class Root extends Component {
  static propTypes = {
    children: element.isRequired,
    mainMenuOpened: bool.isRequired,
    openMainMenu: func.isRequired,
    closeMainMenu: func.isRequired,
    user: shape({
      isStored: bool.isRequired,
      isAuthenticated: bool.isRequired,
      isFetched: bool.isRequired,
      _id: string,
      name: string,
    }).isRequired,
  };

  static defaultProps = {
    linksSettings: [
      { to: '/', description: 'Home' },
      { to: '/users', description: 'Users' },
      { to: '/login', description: 'Login' },
      { to: '/signup', description: 'Signup' },
      { to: '/profile', description: 'Profile' },
    ],
  };

  renderIconElement = () => {
    const { props: { user: { isStored, isAuthenticated, isFetched } } } = this;

    if (isStored && isFetched) {
      return (
        <CircularProgress
          style={{ marginTop: 6, marginRight: 15 }}
          size={35}
          thickness={5}
          color="white"
        />
      );
    } else if (isAuthenticated) {
      return <User />;
    }

    return <Authorization />;
  }

  render() {
    const {
      renderIconElement,
      props: {
        children,
        openMainMenu,
        closeMainMenu,
        mainMenuOpened,
        user: { isAuthenticated },
      },
    } = this;

    return (
      <div className={styles.root}>
        <AppBar
          iconElementRight={renderIconElement()}
          onLeftIconButtonTouchTap={openMainMenu}
        />
        <Drawer
          open={mainMenuOpened}
          onRequestChange={closeMainMenu}
          docked={false}
        >
          <MainMenuItem to="/" description="Home" onTouchTap={closeMainMenu} />
          <MainMenuItem to="/users" description="Users" onTouchTap={closeMainMenu} />
          {!isAuthenticated && <MainMenuItem to="/login" description="Login" onTouchTap={closeMainMenu} />}
          {!isAuthenticated && <MainMenuItem to="/signup" description="Signup" onTouchTap={closeMainMenu} />}
          {isAuthenticated && <MainMenuItem to="/profile" description="Profile" onTouchTap={closeMainMenu} />}
        </Drawer>
        {children}
      </div>
    );
  }
}
