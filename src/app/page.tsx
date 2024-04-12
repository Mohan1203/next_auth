'use client'
import react, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface userData {
  email: string,
  _id: string
}


export default function Home() {
  const router = useRouter();

  const [userData, setUserData] = useState<userData>({ email: '', _id: '', })

  useEffect(() => {
    const fetchData = async () => {
      fetch('/api/user/aboutme', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        res.json().then((data) => {
          console.log(data.data)
          setUserData(data.data)
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    }
    fetchData();
  }, [])

  const handleLogOut = async () => {
    try {
      const res = await fetch("/api/user/logout", {
        credentials: 'same-origin'
      })
      console.log(await res.json())
      router.push("/login")
    } catch (error) {
      console.log(error)
    }



  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <p className='text-xl m-2'>User information</p>
      <span className='bg-orange-300 text-black m-2 p-1 font-semibold'>user Id :  {" " + userData._id}</span>
      <span className='bg-orange-300 text-black m-2 p-1 font-semibold'>email Id :  {" " + userData.email}</span>

      <button className='m-2 bg-red-600 p-2 rounded-lg font-bold w-32' onClick={handleLogOut}>Log out</button>
    </div>
  );
} 
