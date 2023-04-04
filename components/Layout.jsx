import { useRouter } from 'next/router'
import Footer from './footer/Footer'
import NavBar from './navBar/NavBar'
import { useContext } from 'react'
import { AuthContext } from '@/store/AuthContext'

export default function Layout({ children }) {
    const router = useRouter()
    const auth = useContext(AuthContext)

    console.log(router.asPath)
    if (router.asPath === "/login" || router.asPath === "/signup") {
        return (
            <>
                <main>{children}</main>
            </>
        )
    }
    else {
        return (
            <>
                <NavBar />
                <main>{children}</main>
                <Footer />
            </>
        )
    }

}