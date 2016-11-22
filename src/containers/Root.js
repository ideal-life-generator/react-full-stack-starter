import React, { Component, cloneElement } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import classes from '../styles/common.scss';

export default class App extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      handleOpen,
      handleClose,
      state: { open },
      props: {
        children,
        children: { props: { route: { component: { title } } } },
      },
    } = this;

    return (
      <div className={classes.root}>
        <AppBar
          title={title}
          onLeftIconButtonTouchTap={handleOpen}
        />
        <Drawer
          open={open}
          onRequestChange={handleClose}
          docked={false}
        >
          <MenuItem
            containerElement={<Link to="/" />}
            onTouchTap={handleClose}
          >
            Main
          </MenuItem>
          <MenuItem
            containerElement={<Link to="/users" />}
            onTouchTap={handleClose}
          >
            Users
          </MenuItem>
        </Drawer>
        {children}
      </div>
    );
  }
}
