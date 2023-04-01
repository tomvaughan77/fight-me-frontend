import { type NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useRef } from 'react'
import Header from '~/components/header/Header'
import { useSocket } from '~/components/socket/socket'

const Home: NextPage = () => {
    // https://github.com/novuhq/blog/blob/main/open-chat-app-with-socketIO/client/src/App.js

    const [username, setUsername] = useState<string>('')
    const [room, setRoom] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [numOnline, setNumOnline] = useState<number>(0)
    const [numArguing, setNumArguing] = useState<number>(0)

    const usernameInputElement = useRef<HTMLInputElement>(null)

    const { socket } = useSocket()
    const router = useRouter()

    useEffect(() => {
        if (socket) {
            socket.on('getRoomResponse', (data: { room: string }) => {
                setRoom(data.room)
                setIsLoading(false)
            })

            socket.on('connectedUsers', (data: { users: number; usersInRooms: number }) => {
                setNumArguing(data.usersInRooms)
                setNumOnline(data.users)
            })

            return () => {
                socket.off('getRoomResponse')
                socket.off('connectedUsers')
            }
        }
    }, [socket])

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (socket) {
            setIsLoading(true)
            socket.emit('getRoom')
        } else {
            console.log("No socket - can't join room")
        }
    }

    useEffect(() => {
        if (room && !isLoading) {
            void router.push({
                pathname: '/chat',
                query: {
                    username: username,
                    room: room,
                },
            })
        }
    }, [router, room, isLoading, username])

    useEffect(() => {
        if (usernameInputElement.current) {
            usernameInputElement.current.focus()
        }
    }, [])

    return (
        <>
            <Header />
            <div className="container mx-auto">
                <h2>
                    There are currently {numOnline} people online, with {numArguing} of them currently arguing!
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <label className="mb-2" htmlFor="username">
                        Enter your username:
                    </label>
                    <input
                        className="px-2 py-1 rounded border border-gray-400 mb-4"
                        type="text"
                        id="username"
                        autoComplete="off"
                        ref={usernameInputElement}
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <button
                        type="submit"
                        className="px-4 py-1 rounded-r bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-colors duration-300"
                    >
                        Fight!
                    </button>
                </form>
            </div>
        </>
    )
}

export default Home
