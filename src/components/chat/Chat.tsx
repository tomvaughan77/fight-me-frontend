import { useEffect, useRef, useState } from 'react'
import { type Socket } from 'socket.io-client'
import type Message from '~/types/Message'

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
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return (
        <div className="flex flex-col h-full">
            <div className="container mx-auto border rounded shadow p-4 flex flex-col h-full">
                <div className="card card-compact card-bordered">
                    <div className="card-body">
                        <h1 className="card-title">
                            You are arguing {<div className="badge badge-success gap-2">FOR</div>}: Loreum Ipsum
                        </h1>
                        <button
                            className="px-4 py-1 rounded-r bg-red-500 text-white font-bold hover:bg-red-600 transition-colors duration-300"
                            onClick={handleLeave}
                        >
                            Sod this...
                        </button>
                    </div>
                </div>
                <div className="flex-grow mb-4 overflow-y-auto">
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
                <div>
                    <Footer username={username} room={room} socket={socket} />
                </div>
            </div>
        </div>
    )
}

interface FooterProps {
    username: string
    room: string
    socket: Socket
}

const Footer: React.FC<FooterProps> = ({ username, room, socket }) => {
    const [message, setMessage] = useState<string>('')

    const textInputElement = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (textInputElement.current) {
            textInputElement.current.focus()
        }
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (message.trim()) {
            socket.emit('message', {
                text: message,
                name: username,
                socketID: socket.id,
                room: room,
            })

            setMessage('')
        }
    }

    return (
        <form className="flex" onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                ref={textInputElement}
                onChange={handleInputChange}
                placeholder="Type your message here"
                className="w-full px-2 py-1 rounded-l border border-gray-400"
            />
            <button
                type="submit"
                className="px-4 py-1 rounded-r bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-colors duration-300"
            >
                Send
            </button>
        </form>
    )
}

export default Chat
