import { AuthContext } from '@/store/AuthContext'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'

const Dashboard = () => {

    const router = useRouter()
    const auth = useContext(AuthContext)

    if (!auth.username) {
        if (typeof window !== 'undefined') {
            router.push("/")
            
        }
    }



    return (
        <div className='h-[100vh]'>dashboard</div>
    )
}

export default Dashboard