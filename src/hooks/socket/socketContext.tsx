import React, { type ReactNode, createContext } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:5000')

export const SocketContext = createContext(socket)

interface SocketProviderProps {
    children: ReactNode
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
)

export default SocketProvider
