import Head from 'next/head'
import React from 'react'
import { withSessionSsr } from 'utils/session'
import ForgotPassword from '../components/forgot-password'
import Layout from '../components/layout'

const ForgotPasswordPage = () => {
  return (
    <Layout>
      <Head>
        <title>HostRefugees - Forgot Password</title>
      </Head>
      <ForgotPassword />
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

export default ForgotPasswordPage
