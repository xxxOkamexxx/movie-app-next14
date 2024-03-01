import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <main className='text-center items-center content-center grid flex-col h-[100vh]'>
      <h2 className='text-4xl pb-3 gradientColorText'>404 | Oops!</h2>
      <p>We could not find the page you were looking for.</p>
      <p>
        Go back to the <Link href="/" className='font-semibold blinkingText text-2l'>Top Page</Link>
      </p>
    </main>
  )
}

export default NotFound