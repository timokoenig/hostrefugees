import { Post } from '@prisma/client'
import Layout from 'components/layout'
import Waitlist from 'components/waitlist'
import moment from 'moment'
import Head from 'next/head'
import prisma from 'prisma/client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { mapPlace } from 'utils/mapper'
import { MappedPlace, MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import { getOptionalSessionUser } from 'utils/session-user'
import Hero from '../components/hero'
import Introduction from '../components/introduction'
import MapPlaces from '../components/map-places'
import Posts from '../components/posts'

type Props = {
  googleMapsKey: string
  user?: MappedUser & { waitlist: boolean }
  places: MappedPlace[]
  posts: Post[]
}

const IndexPage = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title')}</title>
      </Head>
      <Hero />
      <Introduction />
      <MapPlaces googleMapsKey={props.googleMapsKey} places={props.places} />
      <Waitlist user={props.user} />
      <Posts posts={props.posts} />
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  const places = await prisma.place.findMany({
    where: {
      active: true,
      deleted: false,
      OR: [
        {
          availabilityEnd: null,
        },
        {
          availabilityEnd: {
            gte: moment().toDate(),
          },
        },
      ],
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
      deleted: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 4,
  })

  const sessionUser = await getOptionalSessionUser(context.req.session)
  let waitlist = false
  if (sessionUser) {
    const user = await prisma.user.findUnique({ where: { id: sessionUser.id } })
    waitlist = user?.waitlist ?? false
  }

  return {
    props: {
      googleMapsKey: process.env.GOOGLE_MAP_KEY ?? '',
      user: sessionUser ? { ...sessionUser, waitlist } : null,
      places: places.map(mapPlace),
      posts,
    },
  }
})

export default IndexPage
