import { useState, useRef, useEffect } from "react";
import { type Socket } from "socket.io-client"

interface Message {
    username: string;
    text: string;
  }

interface ChatProps {
    socket: Socket
    username: string
}

const Chat: React.FC<ChatProps> = ({ socket, username }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.on("messageResponse", data => {
            const newMessage: Message = { username: data.name, text: data.text }
            setMessages([...messages, newMessage])
        })
    }, [socket, messages]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (message.trim()) {

            socket.emit("message", {
                text: message,
                name: username,
                socketID: socket.id

            })

            setMessage('');
        }
    };

    return (
        <div className="w-full max-w-lg border rounded shadow p-4">
            <div className="mb-4">
                {messages.map((m, index) => (
                    <div key={index}>
                        {
                            m.username !== username ? <div className="chat chat-start">
                                <div className="chat-header">{m.username}</div>
                                <div className="chat-bubble">{m.text}</div>
                            </div> : <div className="chat chat-end">
                                <div className="chat-header">{m.username}</div>
                                <div className="chat-bubble">{m.text}</div>
                            </div>
                        }
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-row">
                <input
                    type="text"
                    value={message}
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
        </div>
    )
}

export default Chat