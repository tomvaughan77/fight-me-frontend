import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import io, { type Socket } from 'socket.io-client'

interface SocketProviderProps {
    children: ReactNode
}

const SocketContext = createContext<{ socket: Socket | null }>({
    socket: null,
})

export function useSocket() {
    return useContext(SocketContext)
}

export function SocketProvider({ children }: SocketProviderProps) {
    const [socket, setSocket] = useState<Socket | null>(null)

    useEffect(() => {
        const socketInstance = io('http://localhost:5000')
        setSocket(socketInstance)

        return () => {
            socketInstance.disconnect()
        }
    }, [])

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}
