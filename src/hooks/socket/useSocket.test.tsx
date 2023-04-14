import { act, renderHook } from '@testing-library/react'
import { Socket, io } from 'socket.io-client'
import useSocket from './useSocket'
import React, { ReactNode } from 'react'
import { SocketContext } from './socketContext'

jest.mock('socket.io-client', () => ({
    io: jest.fn(),
}))

describe('useSocket', () => {
    let socketMock: jest.Mocked<Socket>
    let wrapper: React.FC<{ children: ReactNode }>

    beforeEach(() => {
        socketMock = {
            on: jest.fn((_, callback) => callback()),
            emit: jest.fn(),
            disconnect: jest.fn(),
            id: '98765',
        } as unknown as jest.Mocked<Socket>

        wrapper = ({ children }) => {
            return <SocketContext.Provider value={socketMock}>{children}</SocketContext.Provider>
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should register event handlers if provided', () => {
        const handlers = {
            leaveRoomResponse: jest.fn(),
        }

        renderHook(() => useSocket(handlers), { wrapper })

        expect(socketMock.on).toHaveBeenCalledTimes(Object.keys(handlers).length)
        expect(socketMock.on).toHaveBeenCalledWith('leaveRoomResponse', expect.any(Function))
    })

    it('should call leaveRoom and emit the leaveRoom event', () => {
        const roomId = '12345'
        const { result } = renderHook(() => useSocket(), { wrapper })

        act(() => {
            result.current.leaveRoom(roomId)
        })

        expect(socketMock.emit).toHaveBeenCalledWith('leaveRoom', { room: roomId })
    })

    it('should call the leaveRoomResponse callback on the leaveRoomResponse event', () => {
        const leaveRoomResponse = jest.fn()
        renderHook(
            () =>
                useSocket({
                    leaveRoomResponse: leaveRoomResponse,
                }),
            { wrapper }
        )

        act(() => {
            socketMock.emit('leaveRoomResponse')
        })

        expect(leaveRoomResponse).toHaveBeenCalledTimes(1)
    })

    it('should call sendMessage and emit the message event', () => {
        const roomId = '12345'
        const username = 'example_name'
        const text = 'hello world'

        const { result } = renderHook(() => useSocket(), { wrapper })

        act(() => {
            result.current.sendMessage(text, username, roomId)
        })

        expect(socketMock.emit).toHaveBeenCalledWith('message', {
            text: text,
            name: username,
            room: roomId,
            socketID: result.current.socket?.id,
        })
    })
})

// describe('useSocket', () => {
//     let socketMock: jest.Mocked<Socket>

//     beforeEach(() => {
//         socketMock = {
//             on: jest.fn(),
//             emit: jest.fn(),
//             disconnect: jest.fn(),
//             id: '98765',
//         } as unknown as jest.Mocked<Socket>
//         ;(io as jest.MockedFunction<typeof io>).mockReturnValue(socketMock)
//     })

//     afterEach(() => {
//         jest.clearAllMocks()
//     })

//     it('should register event handlers if provided', () => {
//         const handlers = {
//             leaveRoomResponse: jest.fn(),
//         }

//         renderHook(() => useSocket(handlers))

//         expect(socketMock.on).toHaveBeenCalledTimes(Object.keys(handlers).length)
//         expect(socketMock.on).toHaveBeenCalledWith('leaveRoomResponse', expect.any(Function))
//     })

//     it('should call leaveRoom and emit the leaveRoom event', () => {
//         const roomId = '12345'
//         const { result } = renderHook(() => useSocket())

//         act(() => {
//             result.current.leaveRoom(roomId)
//         })

//         expect(socketMock.emit).toHaveBeenCalledWith('leaveRoom', { room: roomId })
//     })

//     it('should call sendMessage and emit the message event', () => {
//         const roomId = '12345'
//         const username = 'example_name'
//         const text = 'hello world'

//         const { result } = renderHook(() => useSocket())

//         act(() => {
//             result.current.sendMessage(text, username, roomId)
//         })

//         expect(socketMock.emit).toHaveBeenCalledWith('message', {
//             text: text,
//             name: username,
//             room: roomId,
//             socketID: result.current.socket?.id,
//         })
//     })
// })
