import React from 'react'
import Link from 'next/link'

export default function Header(props) {
  const name = '<SagarGavhane />'
  const links = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Blogs',
      path: '/blogs',
    },
    {
      name: 'Projects',
      path: '/projects',
    },
  ]

  return (
    <div className='px-6 xl:px-0 bg-gray-50 h-14 shadow'>
      <div className='container mx-auto max-w-3xl grid grid-cols-1 items-center h-14'>
        <ul className='flex gap-4 justify-self-end'>
          {links.map((link) => (
            <li key={link.name}>
              <Link href={link.path}>
                <a className='text-sm sm:text-base text-gray-500 cursor-pointer hover:text-gray-800'>
                  {link.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
