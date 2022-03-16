import Head from 'next/head'
import React from 'react'
import { withSessionSsr } from 'utils/session'
import Layout from '../components/layout'
import Register from '../components/register'

const RegisterPage = () => {
  return (
    <Layout>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Register />
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

export default RegisterPage
