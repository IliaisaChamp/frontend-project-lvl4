import React from 'react';
import Message from './Message.js';

export default function Messages({ messages }) {
  return (
    <div>
      {messages.map((m) => (
        <Message text={m.body} user={m.username} key={m.id} />
      ))}
    </div>
  );
}
