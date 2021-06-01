import React from 'react';
import { useField } from 'formik';
import Feedback from './Feedback.js';

export default function TextField({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div
      style={{ position: 'relative' }}
      className="form-floating mb-3 form-group"
    >
      <input
        id={field.name}
        className={`form-control shadow-none ${
          meta.touched && meta.error && 'is-invalid'
        }`}
        {...field}
        {...props}
      />
      <label htmlFor={field.name}>{label}</label>
      <Feedback message={meta.error} />
    </div>
  );
}
