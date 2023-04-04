import { AuthContext } from '@/store/AuthContext'
import React, { useContext } from 'react'

const Publications = () => {
    const auth = useContext(AuthContext)
    return (
        <div className='h-[100vh]'>Publications</div>
    )
}

export default Publications