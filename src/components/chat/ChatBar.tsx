import React, {useState, useEffect} from 'react'
import { useSocket } from '../socket/socket'

const ChatBar = () => {
    const [users, setUsers] = useState<string[]>([])

    const { socket } = useSocket();

    const onNewUserResponse = (data: { users: string[] }) => {
        setUsers(data.users)
    }

    useEffect(()=> {
        if (socket) {
            socket.on("newUserResponse", onNewUserResponse)
        }
    }, [socket, users])

  return (
    <div className='chat__sidebar'>
        <h2>Open Chat</h2>
        <div>
            <h4  className='chat__header'>ACTIVE USERS</h4>
            <div className='chat__users'>
                {users.map(user => <p key={user.socketID}>{user.userName}</p>)}
            </div>
        </div>
  </div>
  )
}

export default ChatBar
