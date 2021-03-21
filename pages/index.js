import Head from 'next/head'
import Link from 'next/link'

import Header from '~/components/Header'
import truncateString from '~/utils/truncateString'
import projects from 'constants/projects.json'

import blogs from 'constants/blogs.json'

export default function Home() {
  return (
    <>
      <Head>
        <title>Sagar Gavhane - Developer, writer, creator</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* <Header /> */}
      <div className='container mx-auto max-w-3xl px-6 xl:px-0'>
        <h1 className='text-2xl sm:text-3xl font-bold mt-16'>
          Hey, I'm <span className=''>Sagar Gavhane</span>
        </h1>
        <p className='my-2 text-gray-500'>
          I’m a developer, writer, and creator. I work at{' '}
          <a
            href='https://www.peppercontent.io/'
            className='text-black hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            Pepper Content
          </a>{' '}
          as a Senior Frontend Developer (SDE II). This place I’ve created to
          share my thoughts, experiences, and ideas.
        </p>
        <p className='my-2 text-gray-500'>
          Most of my work is open source and publicly available on{' '}
          <a
            href='https://github.com/sagar-gavhane'
            className='text-black cursor-pointer hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub
          </a>{' '}
          account.
        </p>
        <p className='my-2 text-gray-500'>
          Connect with me on{' '}
          <a
            href='https://twitter.com/sagar_codes'
            className='text-black cursor-pointer hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            Twitter
          </a>
          .
        </p>
        <h2 className='mt-6 text-xl font-semibold'>Projects</h2>
        <p className='text-gray-500 '>
          Here are a few design projects I've worked on recently.
        </p>
        <ul>
          {projects.map((project) => {
            return (
              <li
                key={project.id}
                className='grid gap-4 my-4 project-list-item'
              >
                <img
                  className='rounded project-list-item-logo flex justify-center items-center p-2 w-12 h-12 sm:w-16 sm:h-16'
                  src={project.logo}
                  alt={project.name}
                />
                <div>
                  <a
                    href={project.link}
                    target='_blank'
                    rel='noopener'
                    className='cursor-pointer'
                  >
                    <h3 className='text-base font-semibold inline-block hover:underline'>
                      {project.name}
                    </h3>
                  </a>
                  <p className='text-sm text-gray-500'>{project.description}</p>
                </div>
              </li>
            )
          })}
        </ul>
        <h2 className='mt-6 text-xl font-semibold'>Blogs</h2>
        <p className='text-gray-500 '>
          I've been writing articles since 2018, mostly about web development
          and tech careers.
        </p>
        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-6'>
          {blogs.map((blog) => {
            return (
              <li key={blog.id} className='my-4'>
                <img className='rounded-md' src={blog.cover} alt={blog.title} />
                <Link href={blog.slug}>
                  <a>
                    <h3 className='text-lg font-medium mt-2 hover:underline'>
                      {blog.title}
                    </h3>
                  </a>
                </Link>
                <p className='text-gray-500'>
                  {truncateString(blog.description, 120)}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
