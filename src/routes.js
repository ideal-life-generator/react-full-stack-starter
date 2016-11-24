import React, { createElement } from 'react';
import { IndexRoute, Route } from 'react-router';
import Root from './containers/Root';
import Home from './containers/Home';
import Users from './containers/Users';

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={Home} />
    <Route path="/users" component={Users} />
  </Route>
);
