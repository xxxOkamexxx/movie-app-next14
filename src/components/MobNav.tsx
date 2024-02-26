'use client'

import { useParams, useSearchParams } from 'next/navigation'
import React, { Dispatch, SetStateAction, useState } from 'react'


interface Props {
  input: string,
  setInput:Dispatch<SetStateAction<string>>,
  handleSubmit:(e: React.FormEvent) => void
}

const MobNav = ({input, setInput, handleSubmit}: Props) => {

  const [isOpen, setIsOpen] = useState(false)
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState("")

  const searchParams = useSearchParams()
  const params = useParams()

  return (
    
    <div >MobNav</div>
  )
}

export default MobNav