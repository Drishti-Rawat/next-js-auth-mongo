'use client'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'


const page = () => {
    // const router = useRouter()

    const [token ,settoken]=useState('')
    const [verified,setVerified] = useState(false)
    
    const verifyEmailUser = async()=>{
        try {
            await axios.post("/api/users/verifyemail",{token})
            setVerified(true)
        } catch (error) {
            
        }

    }

    useEffect(()=>{
       const urltoken = window.location.search.split("=")[1]
       settoken(urltoken || "")

    //    const {query} = router
    //    const urltoken = query.token 
    //    settoken(urltoken)
    },[])

    useEffect(()=>{
        if(token.length>0){
            verifyEmailUser()
        }
    },[token])

  return (
    <div className='flex flex-col gap-5 justify-center items-center min-h-screen py-4'>
        <h2 className='text-4xl'>Verify email</h2>
        <h2 className='p-2 bg-orange-600 text-black'>{token?`${token}`:"no token"}</h2>
      
      {
        verified?(
            <div>
                <h2>Verified successfully</h2>
                <a href="/login">login</a>
            </div>
        ):(
            <div>
                <h2>SOmething went wrong. Please try again</h2>
            </div>
        )
      }
    </div>
  )
}

export default page
