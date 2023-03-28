import { type NextPage } from "next";
import React from 'react';
import Chat from "~/components/chat/Chat";

const Home: NextPage = () => {
  return (
    <div className="App">
      <Chat />
    </div>
  );
};

export default Home;
