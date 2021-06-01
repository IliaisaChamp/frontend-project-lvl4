// @ts-check
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login.js';
import Registration from './pages/Registration.js';
import NotFound from './pages/NotFound.js';
import Main from './pages/Main.js';

export function useRoutes(isAuthenticated) {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/singup" component={Registration} />
      <Redirect to="/login" />
    </Switch>
  );
}

const host = '';
const prefix = 'api/v1';

export default {
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) =>
    [host, prefix, 'channels', id, 'messages'].join('/'),
};
