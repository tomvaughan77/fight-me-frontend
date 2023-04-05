import { useEffect, useRef, useState } from 'react'
import { type Socket } from 'socket.io-client'
import type Message from '~/types/Message'
import Footer from './Footer'

interface ChatProps {
    socket: Socket
    username: string
    room: string
    handleLeave: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Chat: React.FC<ChatProps> = ({ socket, username, room, handleLeave }) => {
    const [messages, setMessages] = useState<Message[]>([])
    const lastMessageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        socket.emit('getMessages', { room: room })
    }, [room, socket])

    useEffect(() => {
        socket.on('messageResponse', (data: { name: string; text: string }) => {
            const newMessage: Message = { username: data.name, text: data.text }
            setMessages([...messages, newMessage])
        })

        socket.on('getMessagesResponse', (data: { name: string; text: string }[]) => {
            const newMessages: Message[] = []

            if (data) {
                data.forEach((m: { name: string; text: string }) => {
                    newMessages.push({ username: m.name, text: m.text })
                })

                setMessages(newMessages)
            }
        })

        return () => {
            socket.off('messageResponse')
            socket.off('getMessagesResponse')
        }
    }, [socket, messages])

    useEffect(() => {
        if (lastMessageRef) {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return (
        <div className="flex h-full w-full">
            <div className="container mx-auto border rounded shadow p-4">
                <div className="card flex-grow card-compact card-bordered">
                    <div className="card-body">
                        <h1 className="card-title">
                            You are arguing {<div className="badge badge-success gap-2">FOR</div>}: Loreum Ipsum
                        </h1>
                        <p>Unique room ID: {room}</p>
                        <button
                            className="px-4 py-1 rounded-r bg-red-500 text-white font-bold hover:bg-red-600 transition-colors duration-300"
                            onClick={handleLeave}
                        >
                            Sod this...
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    {messages.map((m, index) => (
                        <div key={index}>
                            {m.username !== username ? (
                                <div className="chat chat-start">
                                    <div className="chat-header">{m.username}</div>
                                    <div className="chat-bubble chat-bubble-secondary">{m.text}</div>
                                </div>
                            ) : (
                                <div className="chat chat-end">
                                    <div className="chat-header">{m.username}</div>
                                    <div className="chat-bubble chat-bubble-primary">{m.text}</div>
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={lastMessageRef} />
                </div>

                <Footer username={username} room={room} socket={socket} />
            </div>
        </div>
    )
}

export default Chat
