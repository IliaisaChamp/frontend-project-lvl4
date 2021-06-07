import React from 'react';

export default function ChatHeader({ channelName, count }) {
  return (
    <div className="bg-light p-3 shadow-sm small">
      <p className="m-0">
        <b>{channelName}</b>
      </p>
      <span>
        {count}
        {' сообщений'}
      </span>
    </div>
  );
}
