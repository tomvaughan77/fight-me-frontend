import { useState, useEffect } from 'react'
import { type Socket } from 'socket.io-client'
import type Message from '~/types/Message'
import Footer from './Footer'

interface ChatProps {
    socket: Socket
    username: string
    room: string
}

const Chat: React.FC<ChatProps> = ({ socket, username, room }) => {
    const [messages, setMessages] = useState<Message[]>([])

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

    return (
        <div className="w-full max-w-lg border rounded shadow p-4">
            <h1>Room: {room}</h1>
            <div className="mb-4">
                {messages.map((m, index) => (
                    <div key={index}>
                        {m.username !== username ? (
                            <div className="chat chat-start">
                                <div className="chat-header">{m.username}</div>
                                <div className="chat-bubble">{m.text}</div>
                            </div>
                        ) : (
                            <div className="chat chat-end">
                                <div className="chat-header">{m.username}</div>
                                <div className="chat-bubble">{m.text}</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Footer username={username} room={room} socket={socket} />
        </div>
    )
}

export default Chat
