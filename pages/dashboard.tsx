import { Text } from '@chakra-ui/react'
import Layout from 'components/layout'
import Spacer from 'components/spacer'
import Head from 'next/head'
import React from 'react'
import { withSessionSsr } from 'utils/session'
import Footer from '../components/footer'
import Navigation from '../components/navigation'

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Layout>
        <Navigation />
        <Text>Dashboard</Text>
        <Spacer />
        <Footer />
      </Layout>
    </>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps() {
  return { props: {} }
})

export default DashboardPage
