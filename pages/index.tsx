import Head from 'next/head'
import React from 'react'
import Footer from '../components/footer'
import Hero from '../components/hero'

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Hero />
      <Footer />
    </>
  )
}

export default IndexPage
