import Head from 'next/head'
import React from 'react'
import { withSessionSsr } from 'utils/session'
import Footer from '../components/footer'
import Layout from '../components/layout'
import Login from '../components/login'
import Navigation from '../components/navigation'
import Spacer from '../components/spacer'

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Layout>
        <Navigation />
        <Login />
        <Spacer />
        <Footer />
      </Layout>
    </>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps() {
  return { props: {} }
})

export default LoginPage
