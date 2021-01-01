import Head from 'next/head'

import Header from '~/components/Header'

export default function Home() {
  const projects = [
    {
      id: '24a41ba3-1698-494b-a895-73fc3fe0f2f4',
      name: 'Experience Manager (XM)',
      description: `XM provides a single place to create, manage, and enrich your website content. An XM solution makes it faster and easier to create and deliver compelling online shopping experiences to your customers.`,
      logo: `https://placehold.co/128x128`,
      link: 'https://fabric.inc/xpm',
    },
    {
      id: 'd34cf0d2-d132-4920-8aac-c2e3b2f6b117',
      name: 'BuildDirect',
      description: `BuildDirect connects homeowners and home improvement professionals with sellers around the world through innovation and technology, creating a much simpler and trusted shopping experience.`,
      logo: `https://placehold.co/128x128`,
      link: 'http://builddirect.com/',
    },
    {
      id: 'c348291e-5e6e-4fb5-aa5c-69faacd91fd6',
      name: 'EddieBauer',
      description: `EddieBauer is a clothing store chain company based in  Bellevue, Washington DC. For over 100 years, Eddie Bauer has made apparel, footwear, and gear to inspire and enable you to Live Your Adventure.`,
      logo: `https://placehold.co/128x128`,
      link: 'https://www.eddiebauer.com/',
    },
  ]
  return (
    <>
      <Head>
        <title>Sagar Gavhane - Developer, writer, creator</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className='container mx-auto max-w-3xl px-6 xl:px-0'>
        <h1 className='text-2xl sm:text-3xl font-bold mt-8'>
          Hey, I'm <span className='text-purple-600'>Sagar Gavhane</span>
        </h1>
        <p className='my-2 text-gray-500'>
          I’m a developer, writer, and creator. I work at{' '}
          <a
            href='https://www.peppercontent.io/'
            className='text-purple-700 hover:underline hover:text-purple-900'
            target='_blank'
            rel='noopener'
          >
            Pepper Content
          </a>{' '}
          as a Senior Frontend Developer (SDE II). This place I’ve created to
          share my thoughts, experiences, and ideas.
        </p>
        <p className='my-2 text-gray-500'>
          Most of my work is open source and publicly available on GitHub
          account.
        </p>
        <p className='my-2 text-gray-500'>
          Connect with me on{' '}
          <a
            href='https://twitter.com/sagar_codes'
            className='text-purple-700 cursor-pointer hover:underline hover:text-purple-900'
            target='_blank'
            rel='noopener'
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
                  className='rounded'
                  src={project.logo}
                  alt={project.name}
                />
                <div>
                  <a
                    href={project.link}
                    target='_blank'
                    rel='noopener'
                    className='text-purple-700 cursor-pointer'
                  >
                    <h3 className='text-base font-semibold inline-block hover:underline hover:text-purple-900'>
                      {project.name}
                    </h3>
                  </a>
                  <p className='text-sm text-gray-500'>{project.description}</p>
                </div>
              </li>
            )
          })}
        </ul>
        <button className='grid justify-center w-full text-sm text-purple-700 hover:underline hover:text-purple-900'>
          More projects
        </button>
      </div>
    </>
  )
}
