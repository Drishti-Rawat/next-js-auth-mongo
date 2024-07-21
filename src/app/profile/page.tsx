'use client'
import { GetDataFromToken } from '@/helpers/GetDataFromToken'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {
    const router = useRouter()
    const [data,setData] = useState("")
    

    const getUserData = async()=>{
        
        try {
            const userData = await axios.post("/api/users/Personal")
            console.log(userData)
            setData(userData.data.data._id)
        } catch (error) {
            console.log("fauled to faitch user data",error)
        }

    }
    console.log(data)

   

    const logoutuser = async()=>{
        try {
            await axios.get("/api/users/logout")
            toast.success("logout succesfull")
            router.push("/login")
        } catch (error) {
            console.log("failed to logout")
        }
    }
  return (
    <div className='flex flex-col text-white justify-center items-center gap-5 py-5 min-h-screen'>
      <h2>profile page</h2>

      <h2>{
      !data?"no data":<Link href={`/profile/${data}`}>{data}</Link>
      }</h2>

      <button className='p-3 bg-red-700 text-black' onClick={logoutuser}>logout</button>
      <button className='p-3 bg-green-700 text-white' onClick={getUserData}>Get user details</button>
    </div>
  )
}

export default page
