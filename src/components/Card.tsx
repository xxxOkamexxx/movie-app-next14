/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'

import CardSkeleton from './CardSkeleton';
import Link from 'next/link';
import TMDB_API from '@/utils/TmdbAPI';

interface Prop {
  img: string;
  id: string;
  title: string;
  releaseDate: string;
}

const Card = ({img, id, title, releaseDate}:Prop) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);



  return (
    <div className='group neonBox bg-primary cardSize'>
      {!loaded && !error && <CardSkeleton />}
      {error && <CardSkeleton error /> }
  

      <Link
       className={`${!loaded && error && "hidden"}`}
       href={`/details/${id}`}
      >
        <div className='relative'>
          <img 
            className='object-cover cardSize'
            src={`${TMDB_API.BASE_IMG_URL}/${img}`}
            alt="movie poster"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)} 
          />

          <div className='absolute bg-primary w-[100%] bottom-0 px-4 py-2 text-center transition-all duration-500 opacity-0 group-hover:opacity-100'>
            <p className='font-semibold'>{title}</p>
            <p>{releaseDate}</p>
          </div>

        </div>
      </Link>
    </div>
  )
}

export default Card