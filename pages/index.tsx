import Layout from 'components/layout'
import Spacer from 'components/spacer'
import Head from 'next/head'
import React from 'react'
import { User } from 'utils/model'
import { withSessionSsr } from 'utils/session'
import Footer from '../components/footer'
import Hero from '../components/hero'
import Introduction from '../components/introduction'
import MapPlaces from '../components/map-places'
import Navigation from '../components/navigation'

type Props = {
  user?: User
}

const IndexPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Layout>
        <Navigation user={props.user} />
        <Hero />
        <Introduction />
        <MapPlaces places={[]} />
        <Spacer />
        <Footer />
      </Layout>
    </>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  return {
    props: {
      user: context.req.session.user ?? null,
    },
  }
})

export default IndexPage
