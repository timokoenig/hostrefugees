import { Box, Container, Heading, Text } from '@chakra-ui/react'
import Guest from 'components/dashboard/guest'
import Host from 'components/dashboard/host'
import Layout from 'components/layout'
import Spacer from 'components/spacer'
import Head from 'next/head'
import React from 'react'
import { BathroomType, Place, PlaceType, Request, User, UserRole } from 'utils/model'
import { withSessionSsr } from 'utils/session'
import Footer from '../../components/footer'
import Navigation from '../../components/navigation'

type Props = {
  user: User
  places: Place[]
  requests: Request[]
}

const DashboardPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Layout>
        <Navigation user={props.user} />
        <Container maxW="7xl">
          <Box align="center">
            <Heading as="h2" size="xl">
              Welcome{' '}
              <Text as="span" color="blue.400">
                {props.user.firstname}
              </Text>
            </Heading>
          </Box>
          {props.user.role === UserRole.Guest && <Guest requests={props.requests} />}
          {props.user.role === UserRole.Host && (
            <Host places={props.places} requests={props.requests} />
          )}
        </Container>
        <Spacer />
        <Footer />
      </Layout>
    </>
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
            role: UserRole.Guest,
            languages: [],
          },
          title: '1 Bedroom Apartment',
          addressCity: 'Hamburg',
          rooms: 1,
          beds: 1,
          approved: true,
          active: true,
          description: '',
          type: PlaceType.Private,
          bathroom: BathroomType.Shared,
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
            role: UserRole.Guest,
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
              role: UserRole.Guest,
              languages: [],
            },
            title: '1 Bedroom Apartment',
            addressCity: 'Hamburg',
            rooms: 1,
            beds: 1,
            approved: true,
            active: true,
            description: '',
            type: PlaceType.Private,
            bathroom: BathroomType.Shared,
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
