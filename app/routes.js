import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Root from './containers/Root';
import Home from './containers/Home';
import Users from './containers/Users';
import Signup from './containers/Signup';

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={Home} />
    <Route path="/users" component={Users} />
    <Route path="/signup" component={Signup} />
  </Route>
);
