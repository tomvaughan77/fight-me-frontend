import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Chat from '~/components/chat/Chat'
import useSocket from '~/hooks/useSocket'

const ChatPage: React.FC = () => {
    const { socket } = useSocket()

    const router = useRouter()
    const { username, room, topic, side } = router.query

    useEffect(() => {
        console.log(JSON.stringify(router.query))
        const isEmpty = [username, room, topic, side].some(
            (value) => !value || Array.isArray(value) || value.trim() === ''
        )

        if (isEmpty) {
            console.log('Empty params - redirecting')
            void router.push('/')
        }
    }, [router, username, room, topic, side])

    return (
        <>
            {socket && username ? (
                <Window
                    room={room as string}
                    username={username as string}
                    topic={topic as string}
                    side={side as string}
                />
            ) : (
                <div>
                    <p>Socket unable to connect. Please try again</p>
                </div>
            )}
        </>
    )
}

interface WindowProps {
    room: string
    username: string
    topic: string
    side: string
}

const Window: React.FC<WindowProps> = ({ room, username, topic, side }) => {
    const router = useRouter()
    const { leaveRoom } = useSocket({
        leaveRoomResponse: () => {
            router.push('/')
        },
    })

    return (
        <>
            <Chat room={room} username={username} topic={topic} side={side} handleLeave={() => leaveRoom(room)} />
        </>
    )
}

export default ChatPage
