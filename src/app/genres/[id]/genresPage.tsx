'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios'

import TMDB_API from '@/utils/TmdbAPI';

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import CardsList from '@/components/CardsList';



const Genres = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const mainRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();


  useEffect(() => {
    mainRef?.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })

    const id = params.id.toString();
    const genre = searchParams.get("genre");
    const page = searchParams.get("page");

    const capitalize = function(str:string) {
      if (typeof str !== 'string' || !str) return str;
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    setTitle(capitalize(`${genre}`)+' Movies')
 

    axios.get(`${TMDB_API.BASE_URL}/discover/movie`, {
      params: {
        api_key: TMDB_API.API_KEY,
        with_genres: id,
        page
      }
    }).then((response) => {
      setMovies(response.data.results)
      setCurrentPage(response.data.page)
      setTotalPage(response.data.total_pages)
    }).catch(error => console.log(error))

  },[params.id, searchParams])


  const handlePageChange = (button: string) => {
    let page = ""
    if(button === "prev"){
      page = `${currentPage-1}`
    }else{
      page = `${currentPage+1}`
    }

    router.push(`/genres/${params.id}?genre=${searchParams.get("genre")}&page=${page}`)
  }
  

  return (
    <>
      <CardsList 
        mainRef= {mainRef} 
        title= {title}
        movies= {movies}
        currentPage= {currentPage}
        totalPage= {totalPage}
        handlePageChange= {handlePageChange}
      />
    </>
   
  )
}

export default Genres