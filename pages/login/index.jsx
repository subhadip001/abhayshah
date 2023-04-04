import { AuthContext } from '@/store/AuthContext'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { CgSpinner } from 'react-icons/cg';

function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const auth = useContext(AuthContext)
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            const res = await axios.post('https://abhayasha.onrender.com/login', {
                username: username,
                password: password
            });
            auth.login(res.data.token, res.data.username);
            console.log(res.status)
            setIsLoading(false)
            router.push("/dashboard");

        } catch (error) {
            console.log(error);
            setIsLoading(false)
            console.log(error.response.status)
        }
    };


    return (
        <>
            <div className='h-[100vh] flex m-auto flex-col gap-2 justify-center my-auto'>
                <form onSubmit={handleSubmit} className="flex mx-auto w-[25rem] flex-col justify-around gap-5">
                    <span className='text-[2.5rem] text-blue-500 w-[90%] mx-auto'>Sign in</span>
                    <div className='flex flex-col justify-center gap-5 w-[90%] mx-auto'>
                        <div className='flex flex-col'>
                            <label htmlFor="username">Enrollment Number</label>
                            <input
                                type="text"
                                id='username'
                                placeholder='Type username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                        <button className='bg-blue-500 h-10 flex justify-center items-center text-white font-semibold' type="submit">{isLoading ? <CgSpinner className='text-xl animate-spin' /> : "Log in"}</button>
                    </div>
                    <Link className='w-[90%] mx-auto' href="/signup">New here ? Create an account !</Link>
                </form>

            </div>
        </>
    )
}

export default LoginForm
