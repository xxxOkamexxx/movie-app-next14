import React from 'react'

const Logo = () => {
  return (
    <div>
      <h2 className='text-textColor text-[30px] flex items-center logo'>
        <div className='logoText'>TheM</div>      
        <div className='w-[20px] h-[20px] bg-textColor rounded-full logoCircle'></div>
        <div className='logoText'>vieDB</div>
      </h2>
    </div>
  )
}

export default Logo