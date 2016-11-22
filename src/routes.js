import React, { createElement } from 'react';
import { IndexRoute, Route } from 'react-router';
import Root from './containers/Root';
import Main, { title } from './containers/Main';
import Users from './containers/Users';

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={Main} />
    <Route path="/users" component={Users} />
  </Route>
);
