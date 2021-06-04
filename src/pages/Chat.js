import React, { useContext, useEffect, useCallback, useState } from 'react';
import { Row, Container } from 'react-bootstrap';
import ChatBody from '../components/Chat/Body/ChatBody.js';
import Chanels from '../components/Chat/Chanels/Chanels.js';
import useHttp from '../hooks/http.hook.js';
import AuthContext from '../context/AuthContext.js';

export default function Chat() {
  const auth = useContext(AuthContext);
  const data = useFetchChats(auth.username, auth.token);
  console.log(data);

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

function useFetchChats(username, token) {
  const { request } = useHttp();
  const [chatsData, setChatsData] = useState(null);

  const requestData = useCallback(async () => {
    const { data } = await request('/api/v1/data', 'GET', { username }, token);
    setChatsData(data);
  }, []);

  useEffect(() => {
    requestData();
  }, []);

  return chatsData;
}
