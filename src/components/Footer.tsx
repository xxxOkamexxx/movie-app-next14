import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <>
      <hr className='px-8 border-textColor items-center' />
      
      <div className='text-center font-light text-textColor pt-4 text-[13px] md:text-[16px]'>
        © ChikageMolander {new Date().getFullYear()}.
        <p>Made by using{" "}
          <Link
            className='text-white font-semibold neonText'
            href='https://www.themoviedb.org/'
            target='_blank'
          >
            TMDB API
          </Link>
        </p>
      </div>
    </>
  )
}

export default Footer
