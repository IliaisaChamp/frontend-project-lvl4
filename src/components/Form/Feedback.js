import React from 'react';
import { FormControl } from 'react-bootstrap';

export default function Feedback({ message }) {
  return (
    <>
      <FormControl.Feedback type="invalid" tooltip>
        {message}
      </FormControl.Feedback>
    </>
  );
}
