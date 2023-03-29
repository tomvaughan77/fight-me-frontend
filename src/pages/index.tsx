import { type NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useState } from 'react';
import { useSocket } from "~/components/socket/socket";

const Chat = dynamic(() => import('../components/chat/Chat'), { ssr: false });

const Home: NextPage = () => {
  // https://github.com/novuhq/blog/blob/main/open-chat-app-with-socketIO/client/src/App.js

  const [username, setUsername] = useState('');

  const { socket } = useSocket();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to my chat app</h1>

      <div className="flex flex-col items-center">
        <label className="mb-2" htmlFor="username">
          Enter your username:
        </label>
        <input
          className="px-2 py-1 rounded border border-gray-400 mb-4"
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />

        {username && socket && <Chat socket={socket} username={username} />}
      </div>
    </div>
  );
};

export default Home;
