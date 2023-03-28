import React, { useEffect, useState, useRef } from 'react'
import { type Socket } from 'socket.io-client'
import { useSocket } from '~/components/socket/socket'

interface ChatPageProps {
    socket: Socket
}

const ChatPage: React.FC<ChatPageProps> = () => {
    const [messages, setMessages] = useState<string[]>([])
    const [typingStatus, setTypingStatus] = useState("")
    const lastMessageRef = useRef(null)

    const { socket } = useSocket();

    useEffect(()=> {
      if (socket) {
        socket.on("messageResponse", data => setMessages([...messages, data]))
      }
    }, [socket, messages])
    
      useEffect(()=> {
        if (socket) {
          socket.on("typingResponse", data => setTypingStatus(data))
        }
      }, [socket])
    
      useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [messages]);

    return (
        <div className="chat">
        <ChatBar />
        <div className='chat__main'>
            <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
            <ChatFooter />
        </div>
    </div>
    )
}

export default ChatPage