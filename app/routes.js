import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Root from './containers/Root';
import Home from './containers/Home';
import Users from './containers/Users';
import Login from './containers/Login';
import Signup from './containers/Signup';

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={Home} />
    <Route path="/users" component={Users} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
  </Route>
);

// https://github.com/joshgeller/react-redux-jwt-auth-example/blob/master/src/components/AuthenticatedComponent.js
