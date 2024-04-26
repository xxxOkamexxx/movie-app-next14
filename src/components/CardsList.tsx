import React from 'react'
import Loader from './Loader';
import Card from './Card';
import { Imovie } from '@/types/types';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Footer from './Footer';

interface Props {
  mainRef:React.RefObject<HTMLDivElement>;
  title: string;
  movies: never[],
  currentPage: number,
  totalPage: number,
  handlePageChange: (prev: string) => void;
  
}


const CardsList = ({mainRef, title, movies, currentPage, totalPage, handlePageChange,}:Props) => {
  return (
    <main
      className='scrollbarY main-size-h overflow-x-hidden relative'
      ref={mainRef}
    >

      <div className="gradient-01" />
      <div className="gradient-02" />
     

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
      <div className='flex justify-center gap-16 py-6 pt-16 z-20'>
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

export default CardsList