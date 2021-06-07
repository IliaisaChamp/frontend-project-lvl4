import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function Header() {
  const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  return (
    <>
      <Card.Header style={styles}>
        Каналы
        <Button variant="outline-info">&#43;</Button>
      </Card.Header>
    </>
  );
}
