import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import useSocket from '~/hooks/socket/useSocket'
import type Message from '~/types/Message'
import TopicLabel from './TopicLabel'

interface ChatProps {
    username: string
    room: string
    topic: string
    side: string
}

const Chat: React.FC<ChatProps> = ({ username, room, topic, side }) => {
    const [messages, setMessages] = useState<Message[]>([])
    const lastMessageRef = useRef<HTMLDivElement>(null)

    const router = useRouter()

    const { socket, leaveRoom } = useSocket({
        leaveRoomResponse: () => {
            router.push('/')
        },
    })

    useEffect(() => {
        if (socket) {
            socket.emit('getMessages', { room: room })
        }
    }, [room, socket])

    useEffect(() => {
        if (socket) {
            socket.on('messageResponse', (data: { name: string; text: string; timestamp: string }) => {
                const newMessage: Message = { username: data.name, text: data.text, timestamp: data.timestamp }
                setMessages([...messages, newMessage])
            })

            socket.on('getMessagesResponse', (data: { name: string; text: string }[]) => {
                const newMessages: Message[] = []

                if (data) {
                    data.forEach((m: { name: string; text: string; timestamp?: string }) => {
                        newMessages.push({ username: m.name, text: m.text, timestamp: m.timestamp })
                    })

                    setMessages(newMessages)
                }
            })

            return () => {
                socket.off('messageResponse')
                socket.off('getMessagesResponse')
            }
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
                            <TopicLabel topic={topic} side={side} />
                        </h1>
                        <button className="btn-accent btn-sm" onClick={() => leaveRoom(room)}>
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
                                    {m.timestamp ? <div className="chat-footer opacity-50">{m.timestamp}</div> : <></>}
                                </div>
                            ) : (
                                <div className="chat chat-end">
                                    <div className="chat-header">{m.username}</div>
                                    <div className="chat-bubble chat-bubble-primary">{m.text}</div>
                                    {m.timestamp ? <div className="chat-footer opacity-50">{m.timestamp}</div> : <></>}
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={lastMessageRef} />
                </div>
                <div>
                    <Footer username={username} room={room} />
                </div>
            </div>
        </div>
    )
}

interface FooterProps {
    username: string
    room: string
}

const Footer: React.FC<FooterProps> = ({ username, room }) => {
    const [message, setMessage] = useState<string>('')
    const { sendMessage } = useSocket()

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

        sendMessage(message, username, room)
        setMessage('')
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
