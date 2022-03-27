import { Post } from '@prisma/client'
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
import Posts from '../components/posts'

type Props = {
  user?: MappedUser
  places: MappedPlace[]
  posts: Post[]
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
      <Posts posts={props.posts} />
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

  const posts = await prisma.post.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 4,
  })

  return {
    props: {
      user: context.req.session.user ?? null,
      places: places.map(mapPlace),
      posts,
    },
  }
})

export default IndexPage
