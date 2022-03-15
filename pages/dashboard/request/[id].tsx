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
import { User, UserRole } from 'utils/model'
import { withSessionSsr } from 'utils/session'
import Footer from '../../../components/footer'
import Navigation from '../../../components/navigation'

type Props = {
  user?: User
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
              Place Title
            </Button>
          </Box>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
            <Box>
              <Summary />
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
                    {moment().format('DD.MM.YYYY HH:mm')}
                  </Text>
                </Text>
                <Text>
                  Adults:{' '}
                  <Text as="span" fontWeight="semibold">
                    1
                  </Text>
                </Text>
                <Text>
                  Children:{' '}
                  <Text as="span" fontWeight="semibold">
                    1
                  </Text>
                </Text>
                <Text>
                  Languages:{' '}
                  <Text as="span" fontWeight="semibold">
                    English
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
                <Text>Here is a sample placeholder</Text>
              </Box>

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

              <Box backgroundColor="red.500" rounded="xl" textAlign="center" p="5" color="white">
                <Heading size="md" mb="2">
                  DECLINED
                </Heading>
                <Text>The application has been declined</Text>
              </Box>

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
  if (context.req.session.user === undefined || context.req.session.user?.role === UserRole.Guest) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      user: context.req.session.user ?? null,
    },
  }
})

export default RequestPage
