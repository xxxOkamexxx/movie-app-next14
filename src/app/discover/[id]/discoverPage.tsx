'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios'

import { Imovie } from '@/types/types'
import TMDB_API from '@/utils/TmdbAPI';

import Loader from '@/components/Loader';
import Card from '@/components/Card';

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Footer from '@/components/Footer';


const Discover = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [discover, setDiscover] = useState("");

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

    const id = params.id.toString()
    const page = searchParams.get("page")

    setDiscover(id)

    switch (id) {
      case "now_playing":
        setTitle("Now Playing Movies");
        break;
      case "top_rated":
        setTitle("Top Rated");
        break;
      case "popular":
        setTitle("Popular");
        break;
      case "upcoming":
        setTitle("Upcoming");
        break;
      default:
        setTitle("");
        break;
    }

    axios.get(`${TMDB_API.BASE_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API.Api_Key,
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

    router.push(`/discover/${discover}?page=${page}`)
  }

  return (
    <main
      className='scrollbarY bg-primary max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] p-8 overflow-x-hidden relative'
      ref={mainRef}
    >
      <h2 className='text-[24px] trackng-2px'>{title}</h2>
      {movies.length === 0 &&
        <Loader />
      }

      <div className='grid gap-8 moviesGrid place-items-center mt-8'>
        {movies.map((movie: Imovie) => 
          <Card 
            key={movie.id}
            img={movie.poster_path}
            id={movie.id}
            title={movie.title}
            releaseDate={movie.release_date}
          />)
        }
      </div>


      {/* Pagination */}
      <div className='flex justify-center gap-16 py-6 pt-16'>
        <button
           disabled={currentPage === 1}
          onClick={() => handlePageChange("prev")}
          className={`p-2 px-4 page-btn ${currentPage === 1 ? "disabled:bg-secondary disabled:text-textColor" : "neonBox"}`}
        >
          <span><IoIosArrowBack /></span>
          <span>Prev</span>
        </button>

        <p>{currentPage}/{totalPage}</p>

        <button
           disabled={currentPage === totalPage}
          onClick={() => handlePageChange("next")}
          className={`p-2 px-4 page-btn ${currentPage === totalPage ? "disabled:bg-secondary disabled:text-textColor" : "neonBox"}`}
        >
          <span>Next</span>
          <span><IoIosArrowForward /></span>
        </button>
      </div>

      <div className="pb-20">
        <Footer />
      </div>

    </main>
  )
}

export default Discover