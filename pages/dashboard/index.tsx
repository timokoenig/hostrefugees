import { Alert, AlertIcon, Box, Container, Heading, Text } from '@chakra-ui/react'
import { Place, Request, UserRole } from '@prisma/client'
import Guest from 'components/dashboard/guest'
import Host from 'components/dashboard/host'
import Layout from 'components/layout'
import moment from 'moment'
import Head from 'next/head'
import prisma from 'prisma/client'
import React from 'react'
import { mapPlace } from 'utils/mapper'
import { MappedUser } from 'utils/models'
import { onboardingCheck } from 'utils/onboarding-check'
import { withSessionSsr } from 'utils/session'

type Props = {
  user: MappedUser & { verified?: boolean }
  places: Place[]
  requests: Request[]
}

const DashboardPage = (props: Props) => {
  return (
    <Layout user={props.user}>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Container maxW="7xl">
        <Box align="center">
          <Heading as="h2" size="xl">
            Welcome{' '}
            <Text as="span" color="blue.400">
              {props.user.firstname}
            </Text>
          </Heading>
        </Box>
        {props.user.role === UserRole.GUEST && <Guest requests={props.requests} />}
        {props.user.role === UserRole.HOST && (
          <>
            {props.user.verified !== true && (
              <Alert status="warning" variant="solid" rounded="lg" my="5">
                <AlertIcon />
                <Text as="span" fontWeight="semibold" mr="1">
                  Waiting for Approval
                </Text>
                - You will receive an email as soon as your profile has been approved.
              </Alert>
            )}
            <Host places={props.places} requests={props.requests} />
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

  return {
    props: {
      user: context.req.session.user,
      places: places.map(mapPlace),
      requests,
    },
  }
})

export default DashboardPage
