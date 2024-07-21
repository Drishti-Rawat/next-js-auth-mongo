'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const SignUppage = () => {
  const router = useRouter()
  const [username,setUsername] = useState("")
  const [email,setemail] = useState("")
  const [passowrd,setpassword] = useState("")

  const [buttondisabled, setbuttondisabled] = useState(true)
  const [loading,setloading]=useState(false)

  useEffect(()=>{
    if(email.length>0&&passowrd.length>6&&username.length>4){
      setbuttondisabled(false)
    }
    else{
      setbuttondisabled(true)
    }

  },[username,email,passowrd])

  const handlesignup= async(e:any)=>{
    e.preventDefault()
    try {
      setloading(true)
      const response = await axios.post("/api/users/signup",{username:username,email:email,passowrd:passowrd})
      console.log("signup sucess",response)
      router.push('/login')
      setloading(false)
      
    } catch (error:any) {
      console.log("signup failed. failed to fetch api",error)
      toast.error(error.message)
      
    }

  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h2>{loading?"processing....":"signed In"}</h2>
      <form onSubmit={handlesignup} className="flex text-black flex-col items-center gap-4 w-full max-w-xs">
      <span className="w-full flex flex-col gap-2">
        <label htmlFor="email" className="self-start text-green-600 font-semibold">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          placeholder='username'
          onChange={(e)=>{setUsername(e.target.value)}}
          className="rounded-lg p-4 w-full border-none flex items-center gap-2 bg-gray-300 outline outline-2 outline-gray-700 focus:outline-green-600"
        />
      </span>
      <span className="w-full flex flex-col gap-2">
        <label htmlFor="email" className="self-start text-green-600 font-semibold">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder='email'
          onChange={(e)=>{setemail(e.target.value)}}
          className="rounded-lg p-4 w-full border-none flex items-center gap-2 bg-gray-300 outline outline-2 outline-gray-700 focus:outline-green-600"
        />
      </span>
      <span className="w-full flex flex-col gap-2">
        <label htmlFor="password" className="self-start text-green-600 font-semibold">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={passowrd}
          placeholder='password'
          onChange={(e)=>{setpassword(e.target.value)}}
          className="rounded-lg p-4 w-full border-none flex items-center gap-2 bg-gray-300 outline outline-2 outline-gray-700 focus:outline-green-600"
        />
      </span>
      
      
       
      <button  type='submit' className='mt-4 rounded-lg p-4 w-full border-none flex items-center justify-center gap-2 bg-green-600  outline outline-2 outline-gray-700 focus:outline-green-600'>{buttondisabled?"no Sign In":"sign in"}</button>
    </form>
    <h2><a href="/login">visit login </a></h2>

    </div>
  )
}

export default SignUppage
