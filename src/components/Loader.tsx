import React from 'react'

const Loader = () => {
  return (
    <div className='absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 bg-[#1118217a] w-[100vw] h-[100%] grid place-items-center'>
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loader