import React from 'react';
import { Button } from 'react-bootstrap';

export default function ModalButton({
  variant,
  text,
  type,
  handleDelete = null,
  handleClose = null,
  isSubmitting,
}) {
  return (
    <Button
      variant={variant}
      onClick={handleClose || handleDelete}
      type={type}
      disabled={isSubmitting}
    >
      {text}
    </Button>
  );
}
