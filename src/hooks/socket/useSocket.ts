import { useContext, useEffect } from 'react'
import { SocketContext } from './socketContext'

interface SocketHandlers {
    leaveRoomResponse?: () => void
}

const useSocket = (handlers?: SocketHandlers) => {
    const socket = useContext(SocketContext)

    useEffect(() => {
        if (handlers) {
            if (handlers.leaveRoomResponse) {
                socket.on('leaveRoomResponse', () => {
                    if (handlers.leaveRoomResponse) {
                        handlers.leaveRoomResponse()
                    }
                })
            }
        }
    }, [socket, handlers])

    const leaveRoom = (roomId: string) => {
        if (socket) {
            socket.emit('leaveRoom', { room: roomId })
        }
    }

    const sendMessage = (text: string, username: string, room: string) => {
        if (socket) {
            socket.emit('message', {
                text: text,
                name: username,
                socketID: socket.id,
                room: room,
            })
        }
    }

    return { socket, leaveRoom, sendMessage }
}

export default useSocket
