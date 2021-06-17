import React from 'react';
import { Button } from 'react-bootstrap';

export default function ModalButton({
  variant,
  text,
  type,
  handleDelete = () => {},
  handleClose = () => {},
  isSubmitting,
}) {
  return (
    <Button
      variant={variant}
      onClick={() => {
        handleDelete();
        handleClose();
      }}
      type={type}
      disabled={isSubmitting}
    >
      {text}
    </Button>
  );
}
