import { type AppType } from 'next/dist/shared/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import Header from '~/components/header/Header'
import SocketProvider from '~/hooks/socket/socketContext'
import '~/styles/globals.css'

const MyApp: AppType = ({ Component, pageProps }) => (
    <>
        <SocketProvider>
            <Header />
            <Component {...pageProps} />
            <Analytics />
        </SocketProvider>
    </>
)

export default MyApp
