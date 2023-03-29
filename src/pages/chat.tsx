import { useRouter } from 'next/router';
import React from 'react'
import Chat from '~/components/chat/Chat'
import { useSocket } from '~/components/socket/socket'

const ChatPage: React.FC = () => {
    const { socket } = useSocket();

    const router = useRouter();
    const username = router.query.username

    return (
      <>
        {
          socket && username ? <Chat socket={socket} username={Array.isArray(username) ? username[0] : username} /> : <div>
            <p>Socket unable to connect. Please try again</p>
          </div>
        }
      </>
    )
}

export default ChatPage