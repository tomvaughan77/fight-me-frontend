import { type AppType } from 'next/dist/shared/lib/utils'
import { SocketProvider } from '../components/socket/socket'

import Header from '~/components/header/Header'
import '~/styles/globals.css'

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <SocketProvider>
            <Header />
            <Component {...pageProps} />
        </SocketProvider>
    )
}

export default MyApp
