import React, { Suspense } from 'react'
import Search from './searchPage'

const page = () => {
  return (
    <main>
      <Suspense>
        <Search />
      </Suspense>
    </main>
  )
}

export default page