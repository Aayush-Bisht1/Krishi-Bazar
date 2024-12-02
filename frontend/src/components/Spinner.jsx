import React from 'react'
import { HashLoader } from 'react-spinners'

const Spinner = () => {
  return (
    <div className='w-full min-h-[600px] flex items-center justify-center inset-0 bg-transparent'>
        <HashLoader color="#36d7b7" size={130} />
    </div>
  )
}

export default Spinner