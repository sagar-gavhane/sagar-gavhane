import Head from 'next/head'

import Header from '~/components/Header'

export default function Home() {
  return (
    <>
      <Head>
        <title>Sagar Gavhane - Developer, writer, creator</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className='container mx-auto max-w-3xl px-6 xl:px-0'>
        <h1 className='text-2xl sm:text-3xl font-bold mt-8'>
          Hey, I'm{' '}
          <span className='text-gradient bg-gradient-to-r from-purple-400 to-purple-600'>
            Sagar Gavhane
          </span>
        </h1>
        <p className='my-3 text-gray-500'>
          I’m a developer, writer, and creator. I work at{' '}
          <a
            href='https://www.peppercontent.io/'
            className='text-blue-500'
            target='_blank'
            rel='noopener'
          >
            Pepper Content
          </a>{' '}
          as a Senior Frontend Developer (SDE II). This place I’ve created to
          share my thoughts, experiences, and ideas.
        </p>
        <p className='my-3 text-gray-500'>
          Most of my work is open source and publicly available on GitHub
          account.
        </p>
        <p className='my-3 text-gray-500'>
          Connect with me on{' '}
          <a
            href='https://twitter.com/sagar_codes'
            className='text-blue-500 cursor-pointer'
            target='_blank'
            rel='noopener'
          >
            Twitter(@sagar_codes)
          </a>
        </p>
      </div>
    </>
  )
}
