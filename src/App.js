import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login.js';
import Registration from './pages/Registration.js';
import NotFound from './pages/NotFound.js';
import Main from './pages/Main.js';

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/singup" component={Registration} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}
