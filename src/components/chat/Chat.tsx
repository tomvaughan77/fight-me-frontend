import React, { type ReactNode, useEffect, useState } from 'react'
import { socket } from '../socket/socket';

const Chat: React.FC = () => {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }
    
        function onDisconnect() {
            setIsConnected(false);
        }
    
        function onCount(e: { "data": number }) {
            console.log(JSON.stringify(e))
            setCount(e.data)
        }
    
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('ping', onCount);
    
        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
          socket.off('ping', onCount);
        };
      }, []);

    return (
        <>
            <h1>Connection: {isConnected ? "True" : "False"}</h1>
            <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-primary">Count is {count}</div>
            </div>
        </>
    )
}

export default Chat