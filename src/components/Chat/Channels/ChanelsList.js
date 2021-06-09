import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { setCurrentChannelId } from '../../../store/channels.js';

function ChanelButton({ channels }) {
  const dispatch = useDispatch();

  const handleToggle = (channelId) => {
    dispatch(setCurrentChannelId(+channelId));
  };

  const mapingChanels = (data) => {
    const channelsList = data.map((channel) => (
      <Nav.Item key={channel.id} onClick={() => handleToggle(channel.id)}>
        <Nav.Link eventKey={channel.id} className="w-100">
          {channel.name}
        </Nav.Link>
      </Nav.Item>
    ));
    return [...channelsList];
  };

  return (
    <Nav className="flex-column nav-pills" defaultActiveKey={1}>
      {mapingChanels(channels)}
    </Nav>
  );
}

const mapStateToProps = (state) => {
  const { channels } = state.channelsInfo;
  return { channels };
};

export default connect(mapStateToProps)(ChanelButton);
