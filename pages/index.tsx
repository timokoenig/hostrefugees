import Head from 'next/head'
import React from 'react'
import Footer from '../components/footer'
import Hero from '../components/hero'
import Introduction from '../components/introduction'
import Navigation from '../components/navigation'

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Navigation />
      <Hero />
      <Introduction />
      <Footer />
    </>
  )
}

export default IndexPage
