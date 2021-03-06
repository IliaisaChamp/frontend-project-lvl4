import React, { useContext, useEffect, useCallback, useState } from 'react';
import { Row } from 'react-bootstrap';
import { useDispatch, connect } from 'react-redux';
import ChatBody from '../components/Chat/Main/Body.js';
import Channels from '../components/Chat/Channels/Channels.js';
import useHttp from '../hooks/http.hook.js';
import AuthContext from '../context/AuthContext.js';
import { getChannels } from '../store/channels.js';
import { setFetchedMessages } from '../store/messages.js';

function Chat({ currentChannelId, channels }) {
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();

  const fetchChannels = useCallback(async (username, token) => {
    const { data } = await request('/api/v1/data', 'GET', { username }, token);
    const channelsInfo = {
      channels: data.channels,
      currentChannelId: data.currentChannelId,
    };
    dispatch(getChannels(channelsInfo));
    dispatch(setFetchedMessages(data.messages));
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchChannels(auth.username, auth.token);
    }
  }, [fetchChannels]);

  const name = useChannelName(channels, currentChannelId);

  return (
    <Row className="chat bg-white p-0 overflow-hidden">
      <Channels />
      <ChatBody name={name} currentChannelId={currentChannelId} />
    </Row>
  );
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

const mapStateToProps = (state) => {
  const { channelsInfo } = state;
  return {
    channels: channelsInfo.channels,
    currentChannelId: channelsInfo.currentChannelId,
  };
};

export default connect(mapStateToProps)(Chat);
