import React from 'react'

const Logo = () => {
  return (
    <>
      <h2 className='text-white md:text-[30px] text-[28px] flex items-baseline logo'>
        <div className='logoText'>TheM</div>      
        <div className='md:size-[18px] size-[17px] bg-white rounded-full logoCircle'></div>
        <div className='logoText'>vieDB</div>
      </h2>
    </>
  )
}

export default Logo