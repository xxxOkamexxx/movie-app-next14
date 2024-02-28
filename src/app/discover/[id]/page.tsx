import React, { Suspense } from 'react'
import Discover from './discoverPage'

const page = () => {
  return (
    <main>
      <Suspense>
        <Discover />
      </Suspense>
    </main>
  )
}

export default page