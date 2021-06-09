import React, { useState, useEffect, useRef } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { setOpened, setType } from '../../../store/modal.js';
import { addChannel, setCurrentChannelId } from '../../../store/channels.js';
import Modal from '../../Modal/Modal.js';
import ChanelsList from './ChanelsList.js';

export default function Channels() {
  const socket = useRef();
  const dispatch = useDispatch();
  const { isOpened, type } = useSelector((state) => state.modal);
  const [value, setValue] = useState();

  const handleClose = () => {
    dispatch(setOpened(false));
  };

  const handleShow = () => {
    dispatch(setOpened(true));
    dispatch(setType('newChannel'));
  };

  const updateValue = (valueFromModal) => {
    socket.current.emit('newChannel', { ...valueFromModal });
    setValue(valueFromModal);
  };

  useEffect(() => {
    socket.current = io();
  }, []);

  useEffect(() => {
    socket.current.on(type, (channel) => {
      dispatch(addChannel(channel));
      dispatch(setOpened(false));
      dispatch(setCurrentChannelId(+channel.id));
    });
  }, [value]);

  const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  return (
    <>
      <Col sm={3} className="p-0 border-end">
        <Card.Header style={styles}>
          Каналы
          <Button variant="outline-info" onClick={handleShow}>
            &#43;
          </Button>
        </Card.Header>
        <ChanelsList />
      </Col>
      <Modal show={isOpened} handleClose={handleClose} updateValue={updateValue} />
    </>
  );
}
