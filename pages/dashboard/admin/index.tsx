import { Box, Container, Heading, Text } from '@chakra-ui/react'
import { Post, User, UserRole } from '@prisma/client'
import Admin from 'components/dashboard/admin'
import Layout from 'components/layout'
import moment from 'moment'
import Head from 'next/head'
import prisma from 'prisma/client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'

type Props = {
  user: MappedUser
  usersCount: number
  usersChange: number
  placesCount: number
  placesChange: number
  requestsCount: number
  requestsChange: number
  postsCount: number
  postsChange: number
  users: User[]
  posts: Post[]
}

const AdminPage = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Layout user={props.user}>
      <Head>
        <title>HostRefugees - Admin Dashboard</title>
      </Head>
      <Container maxW="7xl">
        <Box align="center">
          <Heading as="h2" size="xl">
            {t('welcome')}{' '}
            <Text as="span" color="blue.400">
              {props.user.firstname}
            </Text>
          </Heading>
        </Box>
        <Admin {...props} />
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user == undefined || context.req.session.user.role != UserRole.ADMIN) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  const usersCount = await prisma.user.count()
  const usersChange = await prisma.user.count({
    where: {
      createdAt: {
        gte: moment().subtract(1, 'day').toDate(),
      },
    },
  })

  const placesCount = await prisma.place.count()
  const placesChange = await prisma.place.count({
    where: {
      createdAt: {
        gte: moment().subtract(1, 'day').toDate(),
      },
    },
  })

  const requestsCount = await prisma.request.count()
  const requestsChange = await prisma.request.count({
    where: {
      createdAt: {
        gte: moment().subtract(1, 'day').toDate(),
      },
    },
  })

  const postsCount = await prisma.post.count()
  const postsChange = await prisma.post.count({
    where: {
      createdAt: {
        gte: moment().subtract(1, 'day').toDate(),
      },
    },
  })

  const users = await prisma.user.findMany({
    where: {
      verified: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  const posts = await prisma.post.findMany({
    where: {
      approved: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return {
    props: {
      user: context.req.session.user,
      usersCount,
      usersChange,
      placesCount,
      placesChange,
      requestsCount,
      requestsChange,
      postsCount,
      postsChange,
      users,
      posts,
    },
  }
})

export default AdminPage
