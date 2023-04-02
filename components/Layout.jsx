import { useRouter } from 'next/router'
import Footer from './footer/Footer'
import NavBar from './navBar/NavBar'

export default function Layout({ children }) {
    const router = useRouter()
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