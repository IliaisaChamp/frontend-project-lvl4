import React, { useContext, useEffect, useCallback } from 'react';
import { Row, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ChatBody from '../components/Chat/Body/ChatBody.js';
import Chanels from '../components/Chat/Chanels/Chanels.js';
import useHttp from '../hooks/http.hook.js';
import AuthContext from '../context/AuthContext.js';
import { getChannels } from '../store/channels.js';

export default function Chat() {
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();

  const fetchChannels = useCallback(async (username, token) => {
    const { data } = await request('/api/v1/data', 'GET', { username }, token);
    console.log(data);
    dispatch(getChannels(...data.channels));
  }, []);

  useEffect(() => {
    fetchChannels(auth.username, auth.token);
  }, [fetchChannels]);

  return (
    <Row className="h-100 align-items-center">
      <Container>
        <Row className="chat bg-white">
          <Chanels />
          <ChatBody />
        </Row>
      </Container>
    </Row>
  );
}
