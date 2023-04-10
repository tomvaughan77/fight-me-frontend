import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { type Socket } from 'socket.io-client'
import Chat from '~/components/chat/Chat'
import { useSocket } from '~/components/socket/socket'

const ChatPage: React.FC = () => {
    const { socket } = useSocket()

    const router = useRouter()
    const { username, room, topic, side } = router.query

    useEffect(() => {
        console.log(JSON.stringify(router.query))
        const isEmpty = [username, room, topic, side].some(
            (value) => !value || Array.isArray(value) || value.trim() === ''
        )

        if (isEmpty) {
            console.log('Empty params - redirecting')
            void router.push('/')
        }
    }, [router, username, room, topic, side])

    return (
        <>
            {socket && username ? (
                <Window
                    socket={socket}
                    room={room as string}
                    username={username as string}
                    topic={topic as string}
                    side={side as string}
                />
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
    topic: string
    side: string
}

const Window: React.FC<WindowProps> = ({ socket, room, username, topic, side }) => {
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
            <Chat socket={socket} room={room} username={username} topic={topic} side={side} handleLeave={handleLeave} />
        </>
    )
}

export default ChatPage
