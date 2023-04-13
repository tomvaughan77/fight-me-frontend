import { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

interface SocketHandlers {
    leaveRoomResponse?: () => void
}

const useSocket = (handlers?: SocketHandlers) => {
    const [socket, setSocket] = useState<Socket>()

    useEffect(() => {
        const socket = io('http://localhost:5000')

        if (handlers) {
            if (handlers.leaveRoomResponse) {
                socket.on('leaveRoomResponse', () => {
                    if (handlers.leaveRoomResponse) {
                        handlers.leaveRoomResponse()
                    }
                })
            }
        }

        setSocket(socket)

        return () => {
            socket.disconnect()
        }
    }, [handlers])

    const leaveRoom = (roomId: string) => {
        if (socket) {
            socket.emit('leaveRoom', { room: roomId })
        }
    }

    return { socket, leaveRoom }
}

export default useSocket
