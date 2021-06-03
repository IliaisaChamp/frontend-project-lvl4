import React from 'react';
import { Row, Container } from 'react-bootstrap';
import ChatBody from '../components/Chat/Body/ChatBody.js';
import Chanels from '../components/Chat/Chanels/Chanels.js';

export default function Main() {
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
