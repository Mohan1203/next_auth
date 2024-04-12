'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link"

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            const data = await fetch(`/api/userauth/login`, {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    "Content-Type": 'application/json'
                }
            })

            console.log(data)
            router.push("/")
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='flex justify-center align-middle items-center  h-screen'>
            <div className=' flex flex-col items-center'>
                <p className='text-xl'>Sign In</p>
                <input type='text' placeholder='Enter your email' className='p-2 rounded-md m-2 text-black' onChange={(e) => setEmail(e.target.value)} value={email} />
                <input type='text' placeholder='Enter your password' className='p-2 rounded-md m-2 text-black' onChange={(e) => setPassword(e.target.value)} value={password} />
                <button className='border-2 w-32 p-2 rounded-md bg-green-600 text-black' onClick={handleLogin}>Sign In</button>
                <Link href='/signup' className='p-2 '>Register page</Link>
            </div>
        </div>
    )
}

export default Login
