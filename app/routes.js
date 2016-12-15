import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import Root from './containers/Root';
import Home from './containers/Home';
import Users from './containers/Users';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Profile from './containers/Profile';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: ({ user }) => user,
  predicate: ({ isAuthenticated }) => isAuthenticated,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
});

const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: ({ user }) => user,
  predicate: ({ isAuthenticated }) => !isAuthenticated,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/',
  allowRedirectBack: false,
});

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={Home} />
    <Route path="/users" component={Users} />
    <Route path="/login" component={UserIsNotAuthenticated((Login))} />
    <Route path="/signup" component={UserIsNotAuthenticated(Signup)} />
    <Route path="/profile" component={UserIsAuthenticated(Profile)} />
  </Route>
);

// https://github.com/acdlite/redux-router
