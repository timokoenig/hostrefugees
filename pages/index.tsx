import Layout from 'components/layout'
import Head from 'next/head'
import React from 'react'
import { User } from 'utils/model'
import { withSessionSsr } from 'utils/session'
import Hero from '../components/hero'
import Introduction from '../components/introduction'
import MapPlaces from '../components/map-places'

type Props = {
  user?: User
}

const IndexPage = (props: Props) => {
  return (
    <Layout user={props.user}>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Hero />
      <Introduction />
      <MapPlaces places={[]} />
    </Layout>
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
