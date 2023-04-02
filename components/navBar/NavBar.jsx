import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import iitr from "../../public/iitr.png"

const NavBar = () => {
    const router = useRouter()

    return (
        <div className='bg-[#3CC4FF] flex justify-between items-center sticky top-0 z-50'>
            <div className='flex items-center text-white text-xl w-[50%] justify-around'>
                <Image className="scale-[0.7]" src={iitr} alt={"iitr"} priority={true} />

                <Link className={`inline-block ${router.asPath==="/"?`underline`:``}`} href={"/"}>Home</Link>
                <Link className={`inline-block ${router.asPath==="/team"?`underline`:``}`} href={"/team"}>Team</Link>
                <Link className={`inline-block ${router.asPath==="/research"?`underline`:``}`} href={"/research"}>Research</Link>
                <Link className={`inline-block ${router.asPath==="/more"?`underline`:``}`} href={"/more"}>More</Link>
            </div>
            <div className='w-[10%]'>
                <Link className='bg-white text-[#5183B8] text-[2vh] h-[35px] w-[55%] flex items-center justify-center font-semibold' href={"login"}>Log in</Link>
            </div>
        </div>
    )
}

export default NavBar