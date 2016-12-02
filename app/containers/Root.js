import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MainMenuItem from '../components/MainMenuItem';
import * as uiActions from '../reducers/ui';
import styles from '../styles/root.scss';

const { bool, string, func, shape, arrayOf, element } = PropTypes;

@connect(({
  ui: { mainMenuOpened },
}) => ({ mainMenuOpened }), dispatch => bindActionCreators({
  openMainMenu: uiActions.openMainMenu,
  closeMainMenu: uiActions.closeMainMenu,
}, dispatch))

export default class Root extends Component {
  static propTypes = {
    children: element.isRequired,
    openMainMenu: func.isRequired,
    closeMainMenu: func.isRequired,
    mainMenuOpened: bool.isRequired,
    linksSettings: arrayOf(shape({
      to: string.isRequired,
      description: string.isRequired,
    }).isRequired).isRequired,
  };

  static defaultProps = {
    linksSettings: [
      { to: '/', description: 'Home' },
      { to: '/users', description: 'Users' },
      { to: '/login', description: 'Login' },
      { to: '/signup', description: 'Signup' },
    ],
  };

  render() {
    const {
      props: {
        children,
        openMainMenu,
        closeMainMenu,
        mainMenuOpened,
        linksSettings,
        children: { props: { route: { component: { title } } } },
      },
    } = this;

    return (
      <div className={styles.root}>
        <AppBar
          title={title}
          onLeftIconButtonTouchTap={openMainMenu}
        />
        <Drawer
          open={mainMenuOpened}
          onRequestChange={closeMainMenu}
          docked={false}
        >
          {linksSettings.map((linkSettings, index) => (<MainMenuItem key={index} {...linkSettings} onTouchTap={closeMainMenu} />))}
        </Drawer>
        {children}
      </div>
    );
  }
}
