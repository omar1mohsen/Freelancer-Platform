import React from 'react'
import Loader from './Loader'

const LoaderPage = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center inset-0 fixed z-[999] bg-[#fafafa]'>
      <Loader main/>
    </div>
  )
}

export default LoaderPage
