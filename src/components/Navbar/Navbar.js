import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function Nav({ isAuthenticated, logout }) {
  const { t } = useTranslation();

  return (
    <Navbar bg="white">
      <Container>
        <Navbar.Brand href="/">{t('main.title')}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end" />
        {isAuthenticated ? (
          <Button variant="outline-info" onClick={() => logout()}>
            {t('button.out')}
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
}
