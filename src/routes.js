import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Main from './containers/Main';
import Home from './containers/Home';
import Users from './containers/Users';
import Signup from './containers/Signup';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Home} />
    <Route path="/users" component={Users} />
    <Route path="/signup" component={Signup} />
  </Route>
);
