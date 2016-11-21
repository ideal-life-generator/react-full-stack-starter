import React, { createElement } from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './containers/App';
import Main, { title } from './containers/Main';
import Users from './containers/Users';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="/users" component={Users} />
  </Route>
);
