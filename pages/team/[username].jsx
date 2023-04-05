import { useRouter } from 'next/router'
import React from 'react'

const Username = () => {
    const router = useRouter()
  return (
    <div>{router.query.username}</div>
  )
}

export default Username