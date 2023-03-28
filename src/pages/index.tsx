import { type NextPage } from "next";
import React, { useState, useEffect, type ReactNode } from 'react';
import { socket } from '../components/socket/socket';
import { ConnectionState } from '../components/socket/ConnectionState';
import { ConnectionManager } from '../components/socket/ConnectionManager';
import { MyForm } from '../components/socket/MyForm';
import { Events } from "../components/socket/Events";

const Home: NextPage = () => {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [fooEvents, setFooEvents] = useState<unknown[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: ReactNode) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  return (
    <div className="App">
      <ConnectionState isConnected={ isConnected } />
      <Events events={ fooEvents } />
      <ConnectionManager />
      <MyForm />
    </div>
  );
};

export default Home;
