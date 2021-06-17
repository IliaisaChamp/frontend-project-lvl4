import React, { useEffect } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { useField } from 'formik';
import Feedback from '../Form/Feedback.js';

export default function Input({ value, dataTestid, label, ...props }) {
  const [field, meta] = useField(props);
  // eslint-disable-next-line functional/no-let
  let input = null;
  useEffect(() => {
    if (input) {
      input.focus();
      input.select();
    }
  }, []);

  return (
    <InputGroup size="lg">
      <FormControl
        ref={(i) => {
          input = i;
        }}
        data-testid={dataTestid}
        name="name"
        value={value}
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
