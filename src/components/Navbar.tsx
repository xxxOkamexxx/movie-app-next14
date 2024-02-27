'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Suspense, useState } from 'react'
import MobNav from './MobNav'
import Logo from './Logo'

const Navbar = () => {

  const [input, setInput] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setInput("")
    router.push(`/search/${input}?page=1`)
  }

  return (
    <div className='bg-primary'>
      <div className='flex justify-between items-center py-4 px-2 md:px-10'>
        <Link 
        className="hidden md:block"
        href="/discover/now_playing"
        >
       
          <Logo />
          
        </Link>


        <form 
          className='space-x-4 hidden md:block' 
          onSubmit={handleSubmit}
        >
          <input 
            className='inputBox neonBox'
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Search...'
          />

         <button
          className='submitBtn neonBox'
         >
          Search
         </button>
        </form>

        <Suspense fallback={<div>Loading...</div>}>
        <MobNav  input={input} setInput={setInput} handleSubmit={handleSubmit} />
        </Suspense>

      </div>
    </div>
  )
}

export default Navbar