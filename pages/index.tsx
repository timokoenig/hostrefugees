import Head from 'next/head'
import React from 'react'
import Footer from '../components/footer'
import HeroComingSoon from '../components/hero-comingsoon'

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>HostRefugees</title>
      </Head>
      {/* <Navigation /> */}
      <HeroComingSoon disableBackButton={true} />
      {/* <Introduction /> */}
      {/* <Map /> */}
      <Footer />
    </>
  )
}

export default IndexPage
