import Head from 'next/head'
import React from 'react'
import Footer from '../components/footer'
import Layout from '../components/layout'
import Navigation from '../components/navigation'
import Register from '../components/register'
import Spacer from '../components/spacer'

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Layout>
        <Navigation />
        <Register />
        <Spacer />
        <Footer />
      </Layout>
    </>
  )
}

export default RegisterPage
