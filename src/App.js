import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { Container } from 'react-bootstrap';

import Login from './pages/Login.js';
import NotFound from './pages/NotFound.js';
import Main from './pages/Main.js';

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}
