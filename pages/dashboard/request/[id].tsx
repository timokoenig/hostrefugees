import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import Layout from 'components/layout'
import Summary from 'components/place/summary'
import Spacer from 'components/spacer'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { Request, RequestStatus, User, UserRole } from 'utils/model'
import { withSessionSsr } from 'utils/session'
import Footer from '../../../components/footer'
import Navigation from '../../../components/navigation'

type Props = {
  user: User
  request: Request
}

const RequestStatusHost = (props: { status: RequestStatus | undefined }): JSX.Element => {
  switch (props.status) {
    case RequestStatus.Accepted:
      return (
        <Box backgroundColor="green.500" rounded="xl" textAlign="center" p="5" color="white">
          <Heading size="md" mb="2">
            ACCEPTED
          </Heading>
          <Text>
            Thanks for accepting this application.
            <br />
            You will receive an email with further details.
          </Text>
        </Box>
      )
    case RequestStatus.Declined:
      return (
        <Box backgroundColor="red.500" rounded="xl" textAlign="center" p="5" color="white">
          <Heading size="md" mb="2">
            DECLINED
          </Heading>
          <Text>The application has been declined</Text>
        </Box>
      )
    case RequestStatus.Canceled:
      return (
        <Box backgroundColor="gray.500" rounded="xl" textAlign="center" p="5" color="white">
          <Heading size="md" mb="2">
            CANCELED
          </Heading>
          <Text>The application has been canceled by the user</Text>
        </Box>
      )
    default:
      return (
        <SimpleGrid columns={3} spacing={5}>
          <GridItem>
            <Button
              rounded="10"
              w="full"
              mt={8}
              size="lg"
              py="7"
              bg="red.500"
              color="white"
              textTransform="uppercase"
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}
            >
              Decline
            </Button>
          </GridItem>
          <GridItem colSpan={2}>
            <Button
              rounded="10"
              w="full"
              mt={8}
              size="lg"
              py="7"
              bg="green.500"
              color="white"
              textTransform="uppercase"
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}
            >
              Accept
            </Button>
          </GridItem>
        </SimpleGrid>
      )
  }
}

const RequestStatusGuest = (props: { status: RequestStatus | undefined }): JSX.Element => {
  switch (props.status) {
    case RequestStatus.Accepted:
      return (
        <Box backgroundColor="green.500" rounded="xl" textAlign="center" p="5" color="white">
          <Heading size="md" mb="2">
            ACCEPTED
          </Heading>
          <Text>You will receive an email with further details.</Text>
        </Box>
      )
    case RequestStatus.Declined:
      return (
        <Box backgroundColor="red.500" rounded="xl" textAlign="center" p="5" color="white">
          <Heading size="md" mb="2">
            DECLINED
          </Heading>
          <Text>The application has been declined</Text>
        </Box>
      )
    case RequestStatus.Canceled:
      return (
        <Box backgroundColor="gray.500" rounded="xl" textAlign="center" p="5" color="white">
          <Heading size="md" mb="2">
            CANCELED
          </Heading>
          <Text>The application has been canceled</Text>
        </Box>
      )
    default:
      return (
        <Box backgroundColor="yellow.500" rounded="xl" textAlign="center" p="5" color="white">
          <Heading size="md" mb="2">
            WAITING
          </Heading>
          <Text>Waiting for the host to accept the application</Text>
        </Box>
      )
  }
}

const RequestPage = (props: Props) => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Layout>
        <Navigation user={props.user} />
        <Container maxW="7xl">
          <Box mb="5">
            <Button variant="ghost" leftIcon={<ArrowBackIcon />} onClick={router.back}>
              Dashboard
            </Button>
          </Box>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
            <Box>
              <Summary place={props.request.place} />
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
                    {props.request.author.languages.join(', ')}
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

              {props.user.role === UserRole.Host && (
                <RequestStatusHost status={props.request.status} />
              )}
              {props.user.role === UserRole.Guest && (
                <RequestStatusGuest status={props.request.status} />
              )}
            </Box>
          </SimpleGrid>
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
      request: {
        id: '1',
        createdAt: new Date().toISOString(),
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
