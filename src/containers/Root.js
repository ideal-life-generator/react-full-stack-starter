import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MainMenuItem from '../components/MainMenuItem';
import * as mainMenuActions from '../reducers/main-menu';
import styles from '../styles/root.scss';

const { bool, string, func, shape, arrayOf, element } = PropTypes;

@connect(({ mainMenu: isOpened }) => ({ isOpened }), dispatch => bindActionCreators(mainMenuActions, dispatch))

export default class Root extends Component {
  static propTypes = {
    children: element.isRequired,
    open: func.isRequired,
    close: func.isRequired,
    isOpened: bool.isRequired,
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
        open,
        close,
        isOpened,
        linksSettings,
        children: { props: { route: { component: { title } } } },
      },
    } = this;

    return (
      <div className={styles.root}>
        <AppBar
          title={title}
          onLeftIconButtonTouchTap={open}
        />
        <Drawer
          open={isOpened}
          onRequestChange={close}
          docked={false}
        >
          {linksSettings.map((linkSettings, index) => (<MainMenuItem key={index} {...linkSettings} onTouchTap={close} />))}
        </Drawer>
        {children}
      </div>
    );
  }
}
