import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { Nav, ButtonGroup, Dropdown } from 'react-bootstrap';
import { setCurrentChannelId } from '../../../store/channels.js';

function ChanelsList({ channels, currentChannelId, handleShow }) {
  const dispatch = useDispatch();

  const handleToggle = (channelId) => {
    dispatch(setCurrentChannelId(+channelId));
  };

  const mapingChanels = (data) => {
    const channelsList = data.map((channel) => (
      <Nav.Item key={channel.id} onClick={() => handleToggle(channel.id)} className="channels-item">
        {!channel.removable ? (
          <Nav.Link
            eventKey={channel.id}
            className={`w-100 channels-link d-flex p-2 ${
              channel.id === currentChannelId ? 'active' : null
            }`}
            as="div"
          >
            <div>
              <span className="me-3">#</span>
              {channel.name}
            </div>
          </Nav.Link>
        ) : (
          <Nav.Link
            eventKey={channel.id}
            className={`w-100 channels-link d-flex p-2 ${
              channel.id === currentChannelId ? 'active' : null
            }`}
            as="div"
          >
            <div>
              <span className="me-3">#</span>
              {channel.name}
            </div>
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
    <Nav
      className="flex-column nav-pills px-2 py-4 flex-nowrap overflow-auto channels-nav"
      defaultActiveKey={currentChannelId && 1}
    >
      {mapingChanels(channels)}
    </Nav>
  );
}

const mapStateToProps = (state) => {
  const { channels, currentChannelId } = state.channelsInfo;
  return { channels, currentChannelId };
};

export default connect(mapStateToProps)(ChanelsList);
