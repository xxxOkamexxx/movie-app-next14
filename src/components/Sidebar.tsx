'use client'

import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import TMDB_API from '@/utils/TmdbAPI'
import { IGenre } from '@/types/types'
import Link from 'next/link'

const Sidebar = () => {

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
      setSelectedGenre(params.id.toString())
    }

  },[searchParams, params.id])

  return (
    <div
    className='bg-primary px-10 max-h-[calc(100vh-77px)] pb-6 scrollbarY hidden sm:block relative'
    >
      <div className='sidebarSectionWrapper'>          
        <p className='sidebarTitle'>
          Discover
        </p>
        
        <Link 
          className='w-fit neonText'
          href="/discover/now_playing"
        >
          <p className={`sidebarLink neonText ${selectedGenre === "now_playing" ? "sidebarActive" : ""}`}>
            Now Playing
          </p>
        </Link>

        <Link 
          className='w-fit neonText'
          href="/discover/top_rated"
        >
          <p className={`sidebarLink neonText ${selectedGenre === "top_rated" ? "sidebarActive" : ""}`}>
            Top Rated
          </p>
        </Link>
        
        <Link 
          className='w-fit neonText'
          href="/discover/popular"
        >
          <p className={`sidebarLink neonText ${selectedGenre === "popular" ? "sidebarActive" : ""}`}>
            Popular
          </p>
        </Link>
        
        <Link 
          className='w-fit neonText'
          href="/discover/upcoming"
        >
          <p className={`sidebarLink neonText ${selectedGenre === "upcoming" ? "sidebarActive" : ""}`}>
            Upcoming
          </p>
        </Link>
      </div> 

      <div className="sidebarSectionWrapper">
        <p className='sidebarTitle'>
          Genre
        </p>
          {
            genres.map((genre:IGenre)=> 
              <Link
                key={genre.id}
                className='w-fit neonText'
                href={`/genres/${genre.id}?genre=${genre.name.toLocaleLowerCase()}`}
              >
                <p className={`sidebarLink neonText ${genre.name.toLocaleLowerCase() === selectedGenre ? "sidebarActive" : ""}`}>
                  {genre.name}
                </p>
              </Link>
            )
          }
      </div>
    </div>
  )
}

export default Sidebar