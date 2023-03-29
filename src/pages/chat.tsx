import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import Chat from '~/components/chat/Chat'
import { useSocket } from '~/components/socket/socket'

const ChatPage: React.FC = () => {
    const { socket } = useSocket();

    const router = useRouter();
    const { username, room } = router.query

    useEffect(() => {
        console.log(JSON.stringify(router.query))
        const isEmpty = [username, room].some(
            value => !value || Array.isArray(value) || value.trim() === ''
          );
      
        if (isEmpty) {
            console.log("Empty params - redirecting")
            router.push('/');
        }
      }, [username, room]);

    return (
      <>
        {
          socket && username ? <Chat socket={socket} room={room as string} username={username as string} /> : <div>
            <p>Socket unable to connect. Please try again</p>
          </div>
        }
      </>
    )
}

export default ChatPage