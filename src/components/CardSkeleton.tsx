import React from 'react'
import { CiImageOff } from 'react-icons/ci'


const CardSkeleton = ({ error }: {error?:boolean}) => {
  return (
    <div className={`cardSize grid place-items-center bg-primary ${!error && "skeleton"}`}>
      {error && <CiImageOff size={56} />}

    </div>
  )
}

export default CardSkeleton
