import Head from 'next/head'
import React from 'react'
import BecomeHost from '../components/become-host'
import Footer from '../components/footer'
import Layout from '../components/layout'
import Navigation from '../components/navigation'
import Spacer from '../components/spacer'

const BecomeHostPage = () => {
  return (
    <>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Layout>
        <Navigation />
        <BecomeHost />
        <Spacer />
        <Footer />
      </Layout>
    </>
  )
}

export default BecomeHostPage
