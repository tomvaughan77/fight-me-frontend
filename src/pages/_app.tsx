import { type AppType } from 'next/dist/shared/lib/utils'
import { SocketProvider } from '../components/socket/socket'

import '~/styles/globals.css'

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <SocketProvider>
            <Component {...pageProps} />
        </SocketProvider>
    )
}

export default MyApp
