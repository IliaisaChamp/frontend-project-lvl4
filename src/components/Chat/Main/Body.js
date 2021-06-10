import React, { useEffect, useState, useContext, useRef } from 'react';
import { io } from 'socket.io-client';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, connect } from 'react-redux';

import Header from './Header.js';
import Form from './Form.js';
import './styles.scss';
import AuthContext from '../../../context/AuthContext.js';
import { getMessages } from '../../../store/messages.js';
import Messages from './Messages.js';

function ChatBody({ name, messages, currentChannelId }) {
  const dispatch = useDispatch();
  const { username } = useContext(AuthContext);
  const [arrivalMessage, setArrivalMessage] = useState();
  const curretnChatMessages = useCurretnChatMessages(messages, currentChannelId);

  const socket = useRef();

  useEffect(() => {
    socket.current = io();
    socket.current.on('newMessage', (data) => {
      setArrivalMessage({
        body: data.body,
        username: data.username,
        channelId: data.channelId,
        id: data.id,
      });
    });
  }, []);

  const handleSendMessage = (text) => {
    const message = {
      body: text,
      channelId: currentChannelId,
      username,
    };
    socket.current.emit('newMessage', message);
  };

  useEffect(() => {
    dispatch(getMessages(arrivalMessage));
  }, [arrivalMessage]);

  return (
    <Col sm={9} className="">
      <Row className="flex-column h-100">
        <Header channelName={name} count={curretnChatMessages.length} />
        <Messages messages={curretnChatMessages} currentChannelId={currentChannelId} />
        <Form handleSendMessage={handleSendMessage} />
      </Row>
    </Col>
  );
}

const mapStateToProps = (state) => {
  const { messages } = state.messagesInfo;
  return {
    messages,
  };
};

function useCurretnChatMessages(messages, currentChannelId) {
  const [currentMessages, setCurrentMessages] = useState([]);

  useEffect(() => {
    const arr = messages.filter((m) => (+m.channelId ? +m.channelId === currentChannelId : []));
    setCurrentMessages(arr);
  }, [messages, currentChannelId]);

  return currentMessages;
}
export default connect(mapStateToProps)(ChatBody);
