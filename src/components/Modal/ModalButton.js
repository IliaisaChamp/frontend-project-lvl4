import React from 'react';
import { Button } from 'react-bootstrap';

export default function ModalButton({ handleClose, variant, text, type = '' }) {
  return (
    <Button variant={variant} onClick={handleClose} type={type}>
      {text}
    </Button>
  );
}
