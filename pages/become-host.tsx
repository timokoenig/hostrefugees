import Head from 'next/head'
import React from 'react'
import { withSessionSsr } from 'utils/session'
import BecomeHost from '../components/become-host'
import Layout from '../components/layout'

const BecomeHostPage = () => {
  return (
    <Layout>
      <Head>
        <title>HostRefugees - Become a Host</title>
      </Head>
      <BecomeHost />
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

export default BecomeHostPage
