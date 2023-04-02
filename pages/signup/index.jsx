import Link from 'next/link'
import { useContext, useState } from 'react'

function SignupForm() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')


    return (
        <>
            <div className='h-[100vh] flex m-auto flex-col gap-2 justify-center my-auto'>
                <form className="flex mx-auto w-[25rem] flex-col justify-around gap-5" onSubmit={(e) => { e.preventDefault() }}>
                    <span className='text-[2.5rem] text-blue-600 w-[90%] mx-auto'>Sign Up</span>
                    <div className='flex flex-col justify-center gap-5 w-[90%] mx-auto'>
                        <div className='flex flex-col'>
                            <label htmlFor="username">Enrollment Number</label>
                            <input
                                type="number"
                                id='username'
                                placeholder='Type username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="inline-block outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id='email'
                                placeholder='Type email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="inline-block outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id='password'
                                placeholder='Type password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="inline-block outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="confirm">Confirm Password</label>
                            <input
                                type="password"
                                id='confirm'
                                placeholder='Confirm password'
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                className="inline-block outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
                            />
                        </div>
                        <button className='bg-blue-600 h-10 text-white font-semibold' type="submit">Register</button>
                    </div>
                    <Link className='w-[90%] mx-auto' href="/login">Already user ? Sign in !</Link>
                </form>

            </div>
        </>
    )
}

export default SignupForm
