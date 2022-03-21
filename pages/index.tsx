import Layout from 'components/layout'
import Head from 'next/head'
import prisma from 'prisma/client'
import React from 'react'
import { mapPlace } from 'utils/mapper'
import { MappedPlace, MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Hero from '../components/hero'
import Introduction from '../components/introduction'
import MapPlaces from '../components/map-places'

type Props = {
  user?: MappedUser
  places: MappedPlace[]
}

const IndexPage = (props: Props) => {
  return (
    <Layout user={props.user}>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Hero />
      <Introduction />
      <MapPlaces places={props.places} />
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  const places = await prisma.place.findMany({
    where: {
      approved: true,
      active: true,
      author: {
        verified: true,
      },
    },
    include: {
      author: {
        select: {
          id: true,
          firstname: true,
          languages: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return {
    props: {
      user: context.req.session.user ?? null,
      places: places.map(mapPlace),
    },
  }
})

export default IndexPage
