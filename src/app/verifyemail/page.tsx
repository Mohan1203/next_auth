'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const VerifyEmail = () => {
    const router = useRouter()

    const [token, setToken] = useState('')
    const [isVerified, setIsVerified] = useState(false)
    const [error, setError] = useState(false)

    const userVerify = async () => {
        try {
            const res = await fetch(`/api/userauth/verifyemail`, {
                method: 'POST',
                body: JSON.stringify(token),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setIsVerified(true)
            router.push("/login")
            console.log(res)
            setError(false)
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }

    useEffect(() => {
        const token = window.location.search.split('=')[1]
        setToken(token)
    }, [])

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <p className='m-2 text-xl'>Verify email</p>
            <span className='bg-orange-600 text-black p-1'>{token ? token : "no token"}</span>
            {error ? <span className='bg-red-500 text-white p-1'>{error}</span> : ""}
            <button className='bg-blue-500 text-black p-2 rounded-md m-2' onClick={userVerify}>Click to verify</button>
        </div>
    )
}

export default VerifyEmail;
