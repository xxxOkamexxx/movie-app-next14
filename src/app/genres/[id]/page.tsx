import React, { Suspense } from 'react'
import Genres from './genresPage'

const page = () => {
  return (
    <main>
      <Suspense>
        <Genres />
      </Suspense>
    </main>
  )
}

export default page