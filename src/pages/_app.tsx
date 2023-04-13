import { type AppType } from 'next/dist/shared/lib/utils'

import Header from '~/components/header/Header'
import '~/styles/globals.css'

const MyApp: AppType = ({ Component, pageProps }) => (
    <>
        <Header />
        <Component {...pageProps} />
    </>
)

export default MyApp
