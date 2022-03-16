import { Box, Container, Heading, Text } from '@chakra-ui/react'
import { BathroomType, Place, PlaceType, Request, User, UserRole } from '@prisma/client'
import Guest from 'components/dashboard/guest'
import Host from 'components/dashboard/host'
import Layout from 'components/layout'
import Head from 'next/head'
import React from 'react'
import { withSessionSsr } from 'utils/session'

type Props = {
  user: User
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
          <Host places={props.places} requests={props.requests} />
        )}
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user === undefined) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      user: context.req.session.user,
      places: [
        {
          id: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          author: {
            id: '1',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            role: UserRole.GUEST,
            languages: [],
          },
          title: '1 Bedroom Apartment',
          addressCity: 'Hamburg',
          rooms: 1,
          beds: 1,
          approved: true,
          active: true,
          description: '',
          type: PlaceType.PRIVATE,
          bathroom: BathroomType.SHARED,
          adults: 1,
          children: 0,
          addressStreet: '',
          addressHouseNumber: '',
          addressCountry: '',
          addressZip: '',
          houseRules: '',
          availabilityStart: new Date().toISOString(),
        },
      ],
      requests: [
        {
          id: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          author: {
            id: '1',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            role: UserRole.GUEST,
            languages: [],
          },
          place: {
            id: '1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            author: {
              id: '1',
              firstname: '',
              lastname: '',
              email: '',
              password: '',
              role: UserRole.GUEST,
              languages: [],
            },
            title: '1 Bedroom Apartment',
            addressCity: 'Hamburg',
            rooms: 1,
            beds: 1,
            approved: true,
            active: true,
            description: '',
            type: PlaceType.PRIVATE,
            bathroom: BathroomType.SHARED,
            adults: 1,
            children: 0,
            addressStreet: '',
            addressHouseNumber: '',
            addressCountry: '',
            addressZip: '',
            houseRules: '',
            availabilityStart: new Date().toISOString(),
          },
          adults: 1,
          children: 0,
          about: '',
          startDate: new Date().toISOString(),
        },
      ],
    },
  }
})

export default DashboardPage
