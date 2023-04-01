import { useState, useRef, useEffect } from 'react'
import { type Socket } from 'socket.io-client'

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
        <form onSubmit={handleSubmit} className="flex flex-row">
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

export default Footer
