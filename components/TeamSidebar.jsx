import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const TeamSidebar = () => {
    const router = useRouter()
    const [userList , setUserList] = useState([])

    return (
        <>
            {router.asPath.includes("/dashboard") && <div className='block w-[15%] h-[100vh]'>
                <div className='flex flex-col h-full bg-[#efefef]'>
                    <ul className="text-center flex flex-col gap-5 mt-5">
                        <Link className={`inline-block ${router.asPath === "/dashboard" ? `underline` : ``}`} href={"/dashboard"}>Basic details</Link>
                        <Link className={`inline-block ${router.asPath === "/dashboard/leave-applications" ? `underline` : ``}`} href={"/dashboard/leave-applications"}>Leave Applications</Link>
                        <Link className={`inline-block ${router.asPath === "/dashboard/resources" ? `underline` : ``}`} href={"/dashboard/resources"}>Resources</Link>
                        <Link className={`inline-block ${router.asPath === "/dashboard/filemanager" ? `underline` : ``}`} href={"/dashboard/filemanager"}>File Manager</Link>
                    </ul>
                </div>
            </div>}
        </>
    )
}

export default TeamSidebar