import React, { useContext, useEffect, useCallback } from 'react';
import { Row, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Main from '../components/Chat/Main/Body.js';
import Channels from '../components/Chat/Channels/Channels.js';
import useHttp from '../hooks/http.hook.js';
import AuthContext from '../context/AuthContext.js';
import { getChannels } from '../store/channels.js';

export default function Chat() {
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();

  const fetchChannels = useCallback(async (username, token) => {
    const { data } = await request('/api/v1/data', 'GET', { username }, token);
    dispatch(getChannels(data));
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchChannels(auth.username, auth.token);
    }
  }, [fetchChannels]);

  return (
    <Row className="h-100 align-items-center">
      <Container>
        <Row className="chat bg-white">
          <Channels />
          <Main />
        </Row>
      </Container>
    </Row>
  );
}
