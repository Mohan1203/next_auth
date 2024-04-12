'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'



const SignUp = () => {
    const router = useRouter();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState<any>('')

    const handleSignup = async () => {
        try {
            const res = await fetch('/api/userauth/signup', {
                method: 'POST',
                body: JSON.stringify({
                    userName: username,
                    email: email,
                    password: password,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setMessage("Verify main send to your email address please verify your email")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex flex-col items-center'>
                <p className='text-xl'>Sign Up</p>
                <input type='text' placeholder='Enter your username' className='p-2 rounded-lg text-black m-2' onChange={(e) => setUsername(e.target.value)} value={username} />
                <input type='text' placeholder='Enter your email' className='p-2 rounded-lg text-black m-2' onChange={(e) => setEmail(e.target.value)} value={email} />
                <input type='password' placeholder='Enter your password' className='p-2 rounded-lg text-black m-2' onChange={(e) => setPassword(e.target.value)} value={password} />
                <button className='m-2 bg-green-600 p-2 w-32 rounded-lg' onClick={handleSignup}>Sign Up</button>
                <p>{message ? message.message : ""}</p>
                <Link href="login">Sign In page</Link>
                {message && <p>{message}</p>}
            </div>
        </div>
    )
}

export default SignUp;
