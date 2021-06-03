import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from './Header.js';
import Main from './Messages.js';
import Form from './Footer.js';

export default function ChatBody() {
  return (
    <Col sm={9} className="">
      <Row className="flex-column h-100">
        <Header />
        <Main />
        <Form />
      </Row>
    </Col>
  );
}
