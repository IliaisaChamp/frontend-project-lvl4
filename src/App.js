import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import useAuth from './hooks/auth.hook.js';
import AuthContext from './context/AuthContext.js';
import { useRoutes } from './routes.js';

export default function App() {
  const { token, login, logout, username } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        username,
        isAuthenticated,
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
}
