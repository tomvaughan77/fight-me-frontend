import React, { createContext, type ReactNode } from 'react'
import { io } from 'socket.io-client'

console.log(process.env.NEXT_PUBLIC_BACKEND_URL)

const url = process.env.NEXT_PUBLIC_BACKEND_URL ? process.env.NEXT_PUBLIC_BACKEND_URL : 'http://localhost'
const port = process.env.NEXT_PUBLIC_BACKEND_URL ? String(process.env.NEXT_PUBLIC_BACKEND_URL) : '5000'
const socket = io(`${url}:${port}`)

export const SocketContext = createContext(socket)

interface SocketProviderProps {
    children: ReactNode
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
)

export default SocketProvider
