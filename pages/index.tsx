import Layout from 'components/layout'
import Spacer from 'components/spacer'
import Head from 'next/head'
import React from 'react'
import Footer from '../components/footer'
import Hero from '../components/hero'
import Introduction from '../components/introduction'
import MapPlaces from '../components/map-places'
import Navigation from '../components/navigation'

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Layout>
        <Navigation />
        <Hero />
        <Introduction />
        <MapPlaces />
        <Spacer />
        <Footer />
      </Layout>
    </>
  )
}

export default IndexPage
