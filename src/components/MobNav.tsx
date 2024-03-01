'use client'

import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import axios from 'axios'

import TMDB_API from '@/utils/TmdbAPI'
import { IGenre } from '@/types/types'
import { RiMenu2Line } from "react-icons/ri";
import { RiCloseLine } from "react-icons/ri";
import Logo from './Logo'


interface Props {
  input: string,
  setInput:Dispatch<SetStateAction<string>>,
  handleSubmit:(e: React.FormEvent) => void
}

const MobNav = ({input, setInput, handleSubmit}: Props) => {

  const [isOpen, setIsOpen] = useState(false)
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState("")

  const searchParams = useSearchParams()
  const params = useParams()

  useEffect(() => {
    axios
      .get(`${TMDB_API.BASE_URL}/genre/movie/list?api_key=${TMDB_API.API_KEY}&include_adult=false&language=en-US`
      )
      .then(({data}) => {
      setGenres(data.genres)
      })
      .catch(error => console.log(error)
      );
  },[])

  useEffect(() => {
    if(searchParams.get("genre")){
      setSelectedGenre(searchParams.get("genre")!)
    }else {
      setSelectedGenre(params.id?.toString())
    }

  },[searchParams, params.id])


  return (  
    <>
      <form 
        className='md:hidden flex justify-between w-[100%]'
        onSubmit={handleSubmit}
      >
        <div
          onClick={() => setIsOpen(true)}
        >
          <RiMenu2Line size={30} />
        </div>

        <div className='space-x-4'>
          <input 
            className='inputBox text-[14px] w-[180px] neonBox'
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Search...'
          />

          <button
          className='submitBtn text-[14px] neonBox'
          >
            Search
          </button>    
        </div>
      </form>

      {/* full screen nav */}
      <div
      className={`min-h-[100vh] max-h-[100vh] w-[100%] bg-primary fixed left-0 top-0 z-10 scrollbarY ${isOpen ? "block" : "hidden"}`}
      >
        {/* Nav-header */}
        <div className='sticky top-0 bg-primary py-4 w-[100%]'>

          <RiCloseLine 
            className='absolute top-0 right-0 m-2 mt-7'
            onClick={() => setIsOpen(false)}
            size={28}
          />
         
        
          <Link
            className='w-fit text-center'
            href='/discover/now_playing'
            onClick={() => setIsOpen(false)}
          >
            <div className='h-[28px] flex justify-center items-end mt-3'>
              <Logo />
            </div>                
          </Link>             
        </div>

        {/* menu */}
        <div className='px-4 pb-16'>
          <div className='sidebarSectionWrapper'>
            
            <p className='sidebarTitle'>
              Discover
            </p>
           
            <Link 
              className='w-fit neonText'
              href="/discover/now_playing"
              onClick={() => setIsOpen(false)}
            >
              <p className={`sidebarLink neonText ${selectedGenre === "now_playing" ? "sidebarActive" : ""}`}>
                Now Playing
              </p>
            </Link>

            <Link 
              className='w-fit neonText'
              href="/discover/top_rated"
              onClick={() => setIsOpen(false)}
            >
              <p className={`sidebarLink neonText ${selectedGenre === "top_rated" ? "sidebarActive" : ""}`}>
                Top Rated
              </p>
            </Link>
           
            <Link 
              className='w-fit neonText'
              href="/discover/popular"
              onClick={() => setIsOpen(false)}
            >
              <p className={`sidebarLink neonText ${selectedGenre === "popular" ? "sidebarActive" : ""}`}>
                Popular
              </p>
            </Link>
            
            <Link 
              className='w-fit neonText'
              href="/discover/upcoming"
              onClick={() => setIsOpen(false)}
            >
              <p className={`sidebarLink neonText ${selectedGenre === "upcoming" ? "sidebarActive" : ""}`}>
                Upcoming
              </p>
            </Link>
            
          </div>

          <div className='sidebarSectionWrapper'>
            
            <p className='sidebarTitle'>
              Genres
            </p>

            {genres.map((genre:IGenre )=> 
            <Link
              key={genre.id}
              className='w-fit neonText'
              href={`/genres/${genre.id}?genre=${genre.name.toLocaleLowerCase()}`}
              onClick={() => setIsOpen(false)}
            >
              <p className={`sidebarLink neonText ${genre.name.toLocaleLowerCase() === selectedGenre ? "sidebarActive" : ""}`}>
                {genre.name}
              </p>
            </Link>
            )}
          </div>
        </div>
      </div> 

    </>
  )
}

export default MobNav