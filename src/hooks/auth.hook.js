import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [username, setUsername] = useState(null);

  const login = useCallback((jwtToken, username) => {
    setToken(jwtToken);
    setUsername(username);
    localStorage.setItem(
      storageName,
      JSON.stringify({
        username: username,
        token: jwtToken,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.username);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, username, ready };
};

export default useAuth;
