import Head from 'next/head'
import React from 'react'
import { withSessionSsr } from 'utils/session'
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

export const getServerSideProps = withSessionSsr(async function getServerSideProps() {
  return { props: {} }
})

export default RegisterPage
