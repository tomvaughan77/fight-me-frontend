import { type AppType } from 'next/dist/shared/lib/utils'

import Header from '~/components/header/Header'
import SocketProvider from '~/hooks/socket/socketContext'
import '~/styles/globals.css'

const MyApp: AppType = ({ Component, pageProps }) => (
    <>
        <SocketProvider>
            <Header />
            <Component {...pageProps} />
        </SocketProvider>
    </>
)

export default MyApp
