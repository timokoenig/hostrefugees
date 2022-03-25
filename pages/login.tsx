import Head from 'next/head'
import React from 'react'
import { withSessionSsr } from 'utils/session'
import Layout from '../components/layout'
import Login from '../components/login'

const LoginPage = () => {
  return (
    <Layout>
      <Head>
        <title>HostRefugees - Login</title>
      </Head>
      <Login />
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user !== undefined) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }
  return { props: {} }
})

export default LoginPage
