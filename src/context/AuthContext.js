import { createContext } from 'react';

function noop() {}

const AuthContext = createContext({
  token: null,
  username: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
});

export default AuthContext;
