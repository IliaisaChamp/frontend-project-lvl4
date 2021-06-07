import React, { useEffect, useState, useContext, useRef } from 'react';
import { io } from 'socket.io-client';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch, connect } from 'react-redux';

import Header from './Header.js';
import Message from './Message.js';
import Form from './Form.js';
import './styles.scss';
import AuthContext from '../../../context/AuthContext.js';
import { getMessages } from '../../../store/messages.js';

function ChatBody({ channels, messages }) {
  const dispatch = useDispatch();
  const { username } = useContext(AuthContext);
  const { currentChannelId } = useSelector((state) => state.channelsInfo);
  const [arrivalMessage, setArrivalMessage] = useState();

  const count = useMessagesCount(messages, currentChannelId);
  const channelName = useChannelName(channels, currentChannelId);

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
        <Header channelName={channelName} count={count} />
        <div>
          {messages.map((m) => (
            <Message text={m.body} user={m.username} key={m.id} />
          ))}
        </div>
        <Form handleSendMessage={handleSendMessage} />
      </Row>
    </Col>
  );
}

const mapStateToProps = (state) => {
  const { messagesInfo, channelsInfo } = state;
  return {
    channels: channelsInfo.channels,
    messages: messagesInfo.messages,
  };
};

function useMessagesCount(messages, currentChannelId) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const arr = messages.filter((message) => message.channelId === currentChannelId);
    setCount(arr.length);
  }, [messages]);
  return count;
}

function useChannelName(channels, currentChannelId) {
  const [channelName, setChannelName] = useState('');
  useEffect(() => {
    const [chat] = channels.filter((channel) => channel.id === currentChannelId);
    if (chat) {
      setChannelName(chat.name);
    }
  }, [currentChannelId]);
  return channelName;
}

export default connect(mapStateToProps)(ChatBody);
