import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import DevTools from '../containers/DevTools';
import MainMenuItem from '../components/MainMenuItem';
import { open, close } from '../reducers/main-menu';
import styles from '../styles/common.scss';

const { env: { NODE_ENV, RENDERING_ON } } = process;

@connect(({ mainMenu }) => ({ mainMenu }), (dispatch) => bindActionCreators({ open, close }, dispatch))

export default class Root extends Component {
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
        mainMenu,
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
          open={mainMenu}
          onRequestChange={close}
          docked={false}
        >
          {linksSettings.map((linkSettings, index) => (<MainMenuItem key={index} {...linkSettings} onTouchTap={close} />))}
        </Drawer>
        {children}
        {NODE_ENV === 'development' && RENDERING_ON === 'browser' && <DevTools />}
      </div>
    );
  }
}
