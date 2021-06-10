import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { Nav, ButtonGroup, Dropdown } from 'react-bootstrap';
import { setCurrentChannelId } from '../../../store/channels.js';

function ChanelButton({ channels, handleShow }) {
  const dispatch = useDispatch();

  const handleToggle = (channelId) => {
    dispatch(setCurrentChannelId(+channelId));
  };

  const mapingChanels = (data) => {
    const channelsList = data.map((channel) => (
      <Nav.Item key={channel.id} onClick={() => handleToggle(channel.id)} className="channel-item">
        {!channel.removable ? (
          <Nav.Link eventKey={channel.id} className="w-100 channel-link d-flex p-2" as="div">
            {channel.name}
          </Nav.Link>
        ) : (
          <Nav.Link eventKey={channel.id} className="w-100 channel-link d-flex p-2" as="div">
            <div>{channel.name}</div>
            <Dropdown as={ButtonGroup} className="">
              <Dropdown.Toggle variant="" className="flex-grow-0 p-0" />
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleShow('removeChannel')}>Удалить</Dropdown.Item>
                <Dropdown.Item onClick={() => handleShow('renameChannel')}>
                  Переименовать
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Link>
        )}
      </Nav.Item>
    ));
    return [...channelsList];
  };

  return (
    <Nav className="flex-column nav-pills p-2" defaultActiveKey={1}>
      {mapingChanels(channels)}
    </Nav>
  );
}

const mapStateToProps = (state) => {
  const { channels } = state.channelsInfo;
  return { channels };
};

export default connect(mapStateToProps)(ChanelButton);
