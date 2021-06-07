import React from 'react';

export default function Message({ user, text }) {
  return (
    <div className="pt-2">
      <b className="me-2">{user}</b>
      <span>{text}</span>
    </div>
  );
}
