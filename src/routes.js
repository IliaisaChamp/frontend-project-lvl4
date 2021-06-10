// @ts-check
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Login from './pages/Login.js';
import Registration from './pages/Registration.js';
// import NotFound from './pages/NotFound.js';
import Chat from './pages/Chat.js';

export function useRoutes(isAuthenticated) {
  if (isAuthenticated) {
    return (
      <Container className="my-5">
        <Switch>
          <Route exact path="/" component={Chat} />
          <Redirect to="/" />
        </Switch>
      </Container>
    );
  }

  return (
    <Container fluid className="flex-grow-1">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/singup" component={Registration} />
        <Redirect to="/login" />
      </Switch>
    </Container>
  );
}

const host = '';
const prefix = 'api/v1';

export default {
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
};
