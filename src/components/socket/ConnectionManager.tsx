import React from 'react';
import { socket } from './socket'

export const ConnectionManager: React.FC = () => {
  const connect = () => {
    socket.connect();
  }

  const disconnect = () => {
    socket.disconnect();
  }

  return (
    <>
      <button onClick={ connect }>Connect</button>
      <button onClick={ disconnect }>Disconnect</button>
    </>
  );
}
