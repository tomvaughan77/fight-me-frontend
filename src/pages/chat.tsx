import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { type Socket } from 'socket.io-client'
import Chat from '~/components/chat/Chat'
import { useSocket } from '~/components/socket/socket'

const ChatPage: React.FC = () => {
  const { socket } = useSocket()

  const router = useRouter()
  const { username, room } = router.query

  useEffect(() => {
    console.log(JSON.stringify(router.query))
    const isEmpty = [username, room].some((value) => !value || Array.isArray(value) || value.trim() === '')

    if (isEmpty) {
      console.log('Empty params - redirecting')
      void router.push('/')
    }
  }, [router, username, room])

  return (
    <>
      {socket && username ? (
        <Window socket={socket} room={room as string} username={username as string} />
      ) : (
        <div>
          <p>Socket unable to connect. Please try again</p>
        </div>
      )}
    </>
  )
}

interface WindowProps {
  socket: Socket
  room: string
  username: string
}

const Window: React.FC<WindowProps> = ({ socket, room, username }) => {
  const router = useRouter()

  useEffect(() => {
    if (socket) {
      socket.on('leaveRoomResponse', () => {
        void router.push('/')
      })

      return () => {
        socket.off('leaveRoomResponse')
      }
    }
  }, [router, socket])

  const handleLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    socket.emit('leaveRoom', { room: room })
  }

  return (
    <>
      <button
        className="px-4 py-1 rounded-r bg-red-500 text-white font-bold hover:bg-red-600 transition-colors duration-300"
        onClick={handleLeave}
      >
        Sod this...
      </button>
      <Chat socket={socket} room={room} username={username} />
    </>
  )
}

export default ChatPage
