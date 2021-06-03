import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import * as _ from 'lodash';

export default function ChanelButton() {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    const current = active;
    setActive(!current);
  };

  const mapingChanels = () => {
    const arr = ['general', '2', '3'];
    return arr.map((item) => (
      <Nav.Item key={_.uniqueId()}>
        <Nav.Link eventKey={item} className="w-100" onClick={handleToggle}>
          {item}
        </Nav.Link>
      </Nav.Item>
    ));
  };

  return (
    <Nav className="flex-column nav-pills" defaultActiveKey="#general">
      {mapingChanels()}
    </Nav>
  );
}
