import React from 'react'

const page = ({params}) => {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
        <h2>Profile page</h2>
        <p className='p-2 bg-green-500'>
            {params.id}
        </p>
      
    </div>
  )
}

export default page
