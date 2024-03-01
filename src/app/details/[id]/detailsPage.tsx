/* eslint-disable @next/next/no-img-element */
'use client'

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

import axios from 'axios';
import TMDB_API from '@/utils/TmdbAPI';
import { Root } from '@/types/types';

import Genres from '@/components/Genres';
import ImageSkeleton from '@/components/ImageSkeleton';
import Loader from '@/components/Loader';

import dynamic from "next/dynamic";

import { RiCloseLine } from "react-icons/ri";
import { RiStarFill } from "react-icons/ri";
import { RiPlayFill } from "react-icons/ri";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });



const MovieDetails = () => {
  const [movie, setMovie] = useState<Root>();
  const [showPlayer, setShowPlayer] = useState(false);
  const [trailer, setTrailer] = useState("")
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const params = useParams();

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.get(`${TMDB_API.BASE_URL}/movie/${params.id}?api_key=${TMDB_API.API_KEY}&append_to_response=videos`)
    .then((res) => {
      console.log(res.data)
      setMovie(res.data)
    })
    .catch((err) => {
      console.log(err)
      setError(true)
    })
  },[params.id])

  useEffect(() => {
    const trailer = movie?.videos
    const trailerIndex = trailer?.results?.findIndex((element) => {
      element.type === "Trailer"
    });

    const trailerUrl = `https://www.youtube.com/watch?v=${trailer?.results[trailerIndex || 0]?.key}`;

    setTrailer(trailerUrl);
  
  },[movie])


  const startPlayer = () => {
    mainRef?.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    setShowPlayer(true);
  }


  return (
    <main
     className='bg-secondary relative main-size-h scrollbarY'
     ref={mainRef}
    >
      {movie === null && <Loader />}

      <div
        className='text-textColor hover:text-white absolute right-0 top-0 m-2 cursor-pointer'
      >
        <RiCloseLine size={28} />
      </div>

      {/* Movie Image */}
      <div className="flex justify-between items-center pt-4 md:pt-0">
        <div className="grid md:grid-cols-[300px,1fr] max-w-[1200px] gap-12">
        
          <div className='relative size-[100%] imageSize'>
            {!loaded && !error && <ImageSkeleton />}
            {error && <ImageSkeleton error /> }
        
            <img 
              className={`imageSize ${!loaded && error && "hidden"}`}
              src={`${TMDB_API.BASE_IMG_URL}${movie?.poster_path}`} 
              alt={`${movie?.title}`} 
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)} 
            />
          </div>

          {/* Movie info */}
          <div className='space-y-6 md:space-y-3 text-textColor'>
            <div className='uppercase text-[26px] md:text-[34px] font-medium pr-4 text-white'>
              {movie?.title}
            </div>  
            <div className="flex gap-4 flex-wrap">
              {movie?.genres?.map((genre, index) => (
                <Genres 
                  key={index}
                  index={index}
                  length={movie.genres.length}
                  name={genre.name}
                  id={genre.id}
                />
              ))}
            </div>

            <div className='flex flex-col md:flex-row gap-2 md:gap-6'>
              <div>Language: {movie?.original_language?.toLocaleUpperCase()}</div>
              <div>Release: {movie?.release_date}</div>
              <div>Runtime: {movie?.runtime} MIN.</div>
              <div className='flex gap-1 items-center'>Rating: {movie?.vote_average}<RiStarFill /></div>
            </div>

            <div className="pt-14 space-y-2 pr-4">
              <div className='font-semibold text-xl'>OVERVIEW:</div>
              <div>{movie?.overview}</div>
            </div>


            <div 
              className="inline-block pt-6 cursor-pointer"
              onClick={startPlayer}
            >
              <div className='play-btn neonBox flex gap-2 items-center px-4 py-2 mb-6'>
                <RiPlayFill size={24} />
                Watch Trailer
              </div>            
            </div>
          </div>
        </div>
      </div>

      {/* React Player */}
      <div
          className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
            showPlayer ? "opacity-100 z-50" : "opacity-0 -z-10"
          }`}
        >
          <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
            <span className="font-semibold">Playing Trailer</span>
            <div
              className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
              onClick={() => setShowPlayer(false)}
            >
              <RiCloseLine className="h-5" />
            </div>
          </div>
          <div className="relative pt-[56.25%]">
            <ReactPlayer
              url={trailer}
              width="100%"
              height="100%"
              style={{ position: "absolute", top: "0", left: "0" }}
              controls={true}
              playing={showPlayer}
            />
          </div>
        </div>

    </main>
  )
}

export default MovieDetails