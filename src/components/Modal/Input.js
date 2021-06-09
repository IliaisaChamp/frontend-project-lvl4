import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { useField } from 'formik';
import Feedback from '../Form/Feedback.js';

export default function Input({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <InputGroup size="lg">
      <FormControl
        name="name"
        aria-label="Large"
        aria-describedby="inputGroup-sizing-sm"
        className={meta.error && 'is-invalid'}
        {...field}
        {...props}
      />
      <Feedback message={meta.error} />
    </InputGroup>
  );
}
