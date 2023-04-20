import React, { createContext, type ReactNode } from 'react'
import { io } from 'socket.io-client'

const url = process.env.BACKEND_URL ?? 'http://localhost'
const port = String(process.env.BACKED_PORT) ?? '5000'
const socket = io(`${url}:${port}`)

export const SocketContext = createContext(socket)

interface SocketProviderProps {
    children: ReactNode
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
)

export default SocketProvider
