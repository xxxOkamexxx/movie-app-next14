import Link from 'next/link';
import React from 'react'

interface Props {
  index: number;
  length: number;
  name: string;
  id: number;
}

const Genres = ({index, length, name, id}:Props) => {
  return (
    <Link
      href={`/genres/${id}?genre=${name.toLocaleLowerCase()}`}
    >
      <div className='flex gap-4 text-textColor hover:text-white'>
        <div>{name}</div>
        <div className="text-textColor">{index + 1 !== length ? '/' : ''}</div>
      </div>
    </Link>
  )
}

export default Genres