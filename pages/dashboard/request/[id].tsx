import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Container, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'
import { Request, User, UserRole } from '@prisma/client'
import Layout from 'components/layout'
import Summary from 'components/place/summary'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { withSessionSsr } from 'utils/session'
import StatusGuest from '../../../components/dashboard/request/status-guest'
import StatusHost from '../../../components/dashboard/request/status-host'

type Props = {
  user: User
  request: Request
}

const RequestPage = (props: Props) => {
  const router = useRouter()
  return (
    <Layout user={props.user}>
      <Head>
        <title>HostRefugees</title>
      </Head>

      <Container maxW="7xl">
        <Box mb="5">
          <Button variant="ghost" leftIcon={<ArrowBackIcon />} onClick={router.back}>
            Dashboard
          </Button>
        </Box>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
          <Box>
            <Summary place={props.request.placeId} />
          </Box>
          <Box>
            <Box mb="5">
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('blue.500', 'blue.300')}
                fontWeight="500"
                textTransform="uppercase"
                mb="4"
              >
                Stay Request Details
              </Text>
              <Text>
                Requested on:{' '}
                <Text as="span" fontWeight="semibold">
                  {moment(props.request.createdAt).format('DD.MM.YYYY HH:mm')}
                </Text>
              </Text>
              <Text>
                Adults:{' '}
                <Text as="span" fontWeight="semibold">
                  {props.request.adults}
                </Text>
              </Text>
              <Text>
                Children:{' '}
                <Text as="span" fontWeight="semibold">
                  {props.request.children}
                </Text>
              </Text>
              <Text>
                Guest Languages:{' '}
                <Text as="span" fontWeight="semibold">
                  {/* {props.request.author.languages.join(', ')} */}
                </Text>
              </Text>
            </Box>

            <Box mb="5">
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('blue.500', 'blue.300')}
                fontWeight="500"
                textTransform="uppercase"
                mb="4"
              >
                About
              </Text>
              <Text>{props.request.about.length == 0 ? 'N/A' : props.request.about}</Text>
            </Box>

            {props.user.role === UserRole.HOST && <StatusHost status={props.request.status} />}
            {props.user.role === UserRole.GUEST && <StatusGuest status={props.request.status} />}
          </Box>
        </SimpleGrid>
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
      request: {
        id: '1',
        createdAt: new Date().toISOString(),
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
          availabilityStart: new Date().toISOString(),
        },
        adults: 1,
        children: 0,
        about: '',
      },
    },
  }
})

export default RequestPage
