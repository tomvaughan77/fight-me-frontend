import { act, renderHook } from '@testing-library/react'
import { Socket, io } from 'socket.io-client'
import useSocket from './useSocket'

jest.mock('socket.io-client', () => ({
    io: jest.fn(),
}))

describe('useSocket', () => {
    let socketMock: jest.Mocked<Socket>

    beforeEach(() => {
        socketMock = {
            on: jest.fn(),
            emit: jest.fn(),
            disconnect: jest.fn(),
        } as unknown as jest.Mocked<Socket>
        ;(io as jest.MockedFunction<typeof io>).mockReturnValue(socketMock)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should create a socket connection on mount', () => {
        renderHook(() => useSocket())

        expect(io).toHaveBeenCalledWith('http://localhost:5000')
    })

    it('should disconnect the socket on unmount', () => {
        const { unmount } = renderHook(() => useSocket())

        unmount()

        expect(socketMock.disconnect).toHaveBeenCalled()
    })

    it('should register event handlers if provided', () => {
        const handlers = {
            leaveRoomResponse: jest.fn(),
        }

        renderHook(() => useSocket(handlers))

        expect(socketMock.on).toHaveBeenCalledTimes(1)
        expect(socketMock.on).toHaveBeenCalledWith('leaveRoomResponse', expect.any(Function))
    })

    it('should call leaveRoom and emit the leaveRoom event', () => {
        const roomId = '12345'
        const { result } = renderHook(() => useSocket())

        act(() => {
            result.current.leaveRoom(roomId)
        })

        expect(socketMock.emit).toHaveBeenCalledWith('leaveRoom', { room: roomId })
    })
})
