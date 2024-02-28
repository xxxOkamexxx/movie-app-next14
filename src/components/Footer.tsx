import Link from 'next/link'
import React from 'react'
import { RiGithubFill } from "react-icons/ri";
import { RiLinkedinBoxFill } from "react-icons/ri";

const Footer = () => {
  return (
    <>
      <hr className='px-8 border-textColor items-center' />
      
      <div className='text-center font-light text-textColor pt-4 text-[13px] md:text-[16px]'>
        © ChikageMolander {new Date().getFullYear()}.

        <div className='flex justify-center items-center gap-4'>
          <Link
            className='iconLink font-semibold neonText text-[32px]'
            href='https://github.com/xxxOkamexxx/movie-app-next14'
            target='_blank'
          >
            <RiGithubFill />
          </Link>
          <Link
            className='iconLink font-semibold neonText text-[32px]'
            href='https://www.linkedin.com/in/chikage-takahashi-molander-542a71220/'
            target='_blank'
          >
            <RiLinkedinBoxFill />
          </Link>

        </div>
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
