

interface ConnectionStateProps {
    isConnected: boolean
}

export const ConnectionState: React.FC<ConnectionStateProps> = ({ isConnected }) => {
    console.log(`STATE: ${JSON.stringify(isConnected)}`)
    return (
        <p>IsConnected: {isConnected}</p>
    )
}