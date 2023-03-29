import { type NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from 'react';

const Home: NextPage = () => {
  // https://github.com/novuhq/blog/blob/main/open-chat-app-with-socketIO/client/src/App.js

  const [username, setUsername] = useState('');

  const router = useRouter()

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/chat?username=${username}`);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Fight.Me</h1>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
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
        <button
            type="submit"
            className="px-4 py-1 rounded-r bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-colors duration-300"
        >
            Fight!
        </button>
      </form>
    </div>
  );
};

export default Home;
