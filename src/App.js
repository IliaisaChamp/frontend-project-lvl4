import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Main from './pages/Main';

export default function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/" component={Main} />
          <Router exact path="/login" component={Login} />
          <Router component={NotFound} />
        </Switch>
      </Router>
    </Container>
  );
}
