import { Alert, AlertIcon, Box, Container, Heading, Text } from '@chakra-ui/react'
import { Place, Post, Request, UserRole } from '@prisma/client'
import Guest from 'components/dashboard/guest'
import Host from 'components/dashboard/host'
import Layout from 'components/layout'
import moment from 'moment'
import Head from 'next/head'
import prisma from 'prisma/client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { mapPlace } from 'utils/mapper'
import { MappedUser } from 'utils/models'
import { onboardingCheck } from 'utils/onboarding-check'
import { withSessionSsr } from 'utils/session'

type Props = {
  user: MappedUser & { verified?: boolean }
  places: Place[]
  requests: Request[]
  posts: Post[]
}

const DashboardPage = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Layout user={props.user}>
      <Head>
        <title>HostRefugees - Dashboard</title>
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
        {props.user.role === UserRole.GUEST && (
          <Guest requests={props.requests} posts={props.posts} />
        )}
        {props.user.role === UserRole.HOST && (
          <>
            {props.user.verified !== true && (
              <Alert status="warning" variant="solid" rounded="lg" my="5">
                <AlertIcon />
                <Text as="span" fontWeight="semibold" mr="1">
                  {t('profile.approval')}
                </Text>
                - {t('profile.approval.text')}
              </Alert>
            )}
            <Host places={props.places} requests={props.requests} posts={props.posts} />
          </>
        )}
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user == undefined) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  if (context.req.session.user.role == UserRole.ADMIN) {
    return {
      redirect: {
        destination: '/dashboard/admin',
        permanent: false,
      },
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      id: context.req.session.user.id,
    },
  })

  const onboardingSteps = await onboardingCheck(context.req.session.user.id)
  if (onboardingSteps.length > 0) {
    // User needs to do the onboarding first
    return {
      redirect: {
        destination: '/onboarding',
        permanent: false,
      },
    }
  }

  const places = await prisma.place.findMany({
    where: {
      author: {
        id: context.req.session.user.id,
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
  })

  const requestsWhere =
    context.req.session.user.role === UserRole.HOST
      ? {
          place: {
            author: {
              id: context.req.session.user.id,
            },
          },
          createdAt: {
            gte: moment().subtract(14, 'days').toDate(),
          },
        }
      : {
          author: {
            id: context.req.session.user.id,
          },
        }
  const requests = await prisma.request.findMany({
    where: requestsWhere,
    include: {
      author: {
        select: {
          id: true,
          firstname: true,
          languages: true,
        },
      },
      place: true,
    },
  })

  const posts = await prisma.post.findMany({
    where: {
      author: {
        id: context.req.session.user.id,
      },
    },
  })

  return {
    props: {
      user: { ...context.req.session.user, verified: user?.verified },
      places: places.map(mapPlace),
      requests,
      posts,
    },
  }
})

export default DashboardPage
