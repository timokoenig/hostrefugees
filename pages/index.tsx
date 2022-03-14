import Layout from 'components/layout'
import Spacer from 'components/spacer'
import Head from 'next/head'
import React from 'react'
import Footer from '../components/footer'
import HeroComingSoon from '../components/hero-comingsoon'
import Navigation from '../components/navigation'

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Layout>
        <Navigation />
        <HeroComingSoon disableBackButton={true} />
        {/* <Introduction /> */}
        {/* <Map /> */}
        <Spacer />
        <Footer />
      </Layout>
    </>
  )
}

export default IndexPage
