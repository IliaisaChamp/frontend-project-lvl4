import React, { useState, useEffect, useRef } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { setOpened, setType } from '../../../store/modal.js';
import { addChannel, updateChannels, removeChannel } from '../../../store/channels.js';
import Modal from '../../Modal/Modal.js';
import ChanelsList from './ChanelsList.js';
import './channels.scss';

export default function Channels() {
  const socket = useRef();
  const dispatch = useDispatch();
  const { isOpened, type } = useSelector((state) => state.modal);
  const { currentChannelId } = useSelector((state) => state.channelsInfo);
  const [value, setValue] = useState();

  const handleClose = () => {
    dispatch(setOpened(false));
  };

  const handleShow = (modalType) => {
    dispatch(setOpened(true));
    dispatch(setType(modalType));
  };

  const updateValue = (valueFromModal = {}) => {
    sendSocket(socket, type, valueFromModal, currentChannelId);
    setValue(valueFromModal);
  };

  useEffect(() => {
    socket.current = io();
  }, []);

  useEffect(() => {
    socket.current.on(type, (channel) => {
      switch (type) {
        case 'renameChannel':
          dispatch(updateChannels(channel));
          dispatch(setOpened(false));
          break;
        case 'newChannel':
          dispatch(addChannel(channel));
          dispatch(setOpened(false));
          break;
        case 'removeChannel':
          dispatch(removeChannel(channel));
          dispatch(setOpened(false));
          break;
        default:
          break;
      }
    });
  }, [value]);

  return (
    <>
      <Col sm={3} className="p-0 border-end">
        <Card.Header className="channel-header">
          Каналы
          <Button variant="outline-info" onClick={() => handleShow('newChannel')}>
            &#43;
          </Button>
        </Card.Header>
        <ChanelsList handleShow={handleShow} />
      </Col>
      <Modal show={isOpened} handleClose={handleClose} updateValue={updateValue} />
    </>
  );
}

function sendSocket(socket, type, value, id) {
  switch (type) {
    case 'renameChannel':
      socket.current.emit(type, { ...value, id });
      break;
    case 'newChannel':
      socket.current.emit(type, { ...value });
      break;
    case 'removeChannel':
      socket.current.emit(type, { id });
      break;
    default:
      break;
  }
}
