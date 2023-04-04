import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import iitr from "../../public/iitr.png"
import { AuthContext } from '@/store/AuthContext'

const NavBar = () => {
    const router = useRouter()
    const auth = useContext(AuthContext)

    return (
        <div className='bg-blue-500 h-[12vh] flex justify-between items-center sticky top-0 z-50'>
            <div className='flex items-center text-white text-xl w-[50%] justify-around'>
                <Image className="scale-[0.6]" src={iitr} alt={"iitr"} priority={true} />

                <Link className={`inline-block ${router.asPath === "/" ? `underline` : ``}`} href={"/"}>Home</Link>
                <Link className={`inline-block ${router.asPath === "/team" ? `underline` : ``}`} href={"/team"}>Team</Link>
                <Link className={`inline-block ${router.asPath === "/research" ? `underline` : ``}`} href={"/research"}>Research</Link>
                {auth.username !== null ? <Link className={`inline-block ${router.asPath === "/dashboard" ? `underline` : ``}`} href={"/dashboard"}>Dashboard ({auth.username})</Link> : <></>}
            </div>
            <div className='w-[10%]'>
                {auth.token ? <span className='bg-white text-blue-500 text-[2vh] h-[35px] w-[55%] flex items-center justify-center font-semibold cursor-pointer' onClick={() => { auth.logout() }}>Log out</span>
                    : <Link className='bg-white text-blue-500 text-[2vh] h-[35px] w-[55%] flex items-center justify-center font-semibold' href={"login"}>Log in</Link>}
            </div>
        </div>
    )
}

export default NavBar