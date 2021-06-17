import React, { useState, useEffect, useRef } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { setOpened, setType } from '../../../store/modal.js';
import {
  addChannel,
  updateChannels,
  removeChannel,
  setCurrentChannelId,
} from '../../../store/channels.js';
import Modal from '../../Modal/Modal.js';
import ChanelsList from './ChanelsList.js';
import './channels.scss';

export default function Channels() {
  const socket = useRef();
  const dispatch = useDispatch();
  const { isOpened, type } = useSelector((state) => state.modal);
  const { currentChannelId } = useSelector((state) => state.channelsInfo);
  const [value, setValue] = useState('');

  const handleClose = () => {
    dispatch(setType(null));
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
    switch (type) {
      case 'renameChannel':
        socket.current.on(type, (channel) => {
          dispatch(updateChannels(channel));
        });
        break;
      case 'removeChannel':
        socket.current.on(type, (channel) => {
          dispatch(removeChannel(channel));
        });
        break;
      case 'newChannel':
        socket.current.once(type, (channel) => {
          dispatch(addChannel(channel));
          dispatch(setCurrentChannelId(channel.id));
        });
        break;
      default:
        break;
    }
    dispatch(setOpened(false));
    dispatch(setType(null));
  }, [value]);

  return (
    <>
      <Col sm={3} className="p-0 border-end bg-light h-100">
        <Card.Header className="channels-header pt-4 px-3 border-0 bg-light">
          Каналы
          <Button variant="outline-info" onClick={() => handleShow('newChannel')}>
            &#43;
          </Button>
        </Card.Header>
        <ChanelsList handleShow={handleShow} />
      </Col>
      <Modal
        show={isOpened}
        handleClose={handleClose}
        updateValue={updateValue}
      />
    </>
  );
}

function sendSocket(socket, type, value, id) {
  switch (type) {
    case 'renameChannel':
      socket.current.emit(type, { ...value, id });
      break;
    case 'newChannel':
      console.log('newChannel from sendSoket');
      socket.current.emit(type, { ...value });
      break;
    case 'removeChannel':
      socket.current.emit(type, { id });
      break;
    default:
      break;
  }
}
