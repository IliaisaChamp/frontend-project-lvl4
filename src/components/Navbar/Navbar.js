import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

export default function Nav({ isAuthenticated, logout }) {
  return (
    <Navbar bg="white">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end" />
        {isAuthenticated ? (
          <Button variant="outline-info" onClick={() => logout()}>
            Выйти
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
}
