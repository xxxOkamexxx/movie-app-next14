import React from 'react'
import { CiImageOff } from 'react-icons/ci'


const ImageSkeleton = ({ error }: {error?:boolean}) => {
  return (
    <div className={`imageSize grid place-items-center bg-primary ${!error && "skeleton"}`}>
      {error && <CiImageOff size={56} />}

    </div>
  )
}

export default ImageSkeleton
