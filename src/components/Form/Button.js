import React from 'react';

export default function Button({ text, isSubmitting }) {
  return (
    <button
      type="submit"
      className="btn btn-outline-primary w-100"
      disabled={isSubmitting}
    >
      {text}
    </button>
  );
}
