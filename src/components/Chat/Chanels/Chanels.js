import React from 'react';
import { Col } from 'react-bootstrap';

import Header from './Header.js';
import ChanelsList from './ChanelsList.js';

export default function Chanels() {
  return (
    <>
      <Col sm={3} className="p-0 border-end">
        <Header />
        <ChanelsList />
      </Col>
    </>
  );
}
