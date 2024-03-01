import React, { Suspense } from 'react'
import MovieDetails from './detailsPage'

const page = () => {
  return (
    <main>
      <Suspense>  
        <MovieDetails />   
      </Suspense>
    </main>
  )
}

export default page