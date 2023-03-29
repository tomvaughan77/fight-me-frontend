// import React, { useEffect, useState } from 'react'
// import { type Socket } from 'socket.io-client'
// import Chat from '~/components/chat/Chat'
// import { useSocket } from '~/components/socket/socket'

// interface ChatPageProps {
//     socket: Socket
// }

// const ChatPage: React.FC<ChatPageProps> = () => {
//     const [messages, setMessages] = useState<string[]>([])

//     const { socket } = useSocket();

//     useEffect(()=> {
//       if (socket) {
//         socket.on("messageResponse", data => setMessages([...messages, data]))
//       }
//     }, [socket, messages])

//     return (
//       <>
//         {
//           socket ? <Chat socket={socket} /> : <div>
//             <p>Socket unable to connect. Please try again</p>
//           </div>
//         }
//       </>
//     )
// }

// export default ChatPage