import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react'
import Layout from 'components/layout'
import Spacer from 'components/spacer'
import Head from 'next/head'
import React from 'react'
import { User, UserRole } from 'utils/model'
import { withSessionSsr } from 'utils/session'
import Footer from '../../../components/footer'
import Navigation from '../../../components/navigation'

type Props = {
  user?: User
}

const RequestPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Layout>
        <Navigation user={props.user} />
        <Container maxW="7xl">
          <Heading>Request to stay at</Heading>
          <Heading mb="5">1 Bedroom</Heading>
          <Text>
            Available from{' '}
            <Text as="span" fontWeight="semibold">
              20.03.2022
            </Text>{' '}
            to{' '}
            <Text as="span" fontWeight="semibold">
              12.04.2022
            </Text>
          </Text>
          <Text>
            Located in{' '}
            <Text as="span" fontWeight="semibold">
              Hamburg
            </Text>
          </Text>
          <Container my="10">
            <Heading size="sm">How many people want to stay at this place?</Heading>
            <Box maxWidth="400">
              <Flex py="5">
                <Text flex="1" fontSize="lg">
                  Adults: 1
                </Text>
              </Flex>
            </Box>
            <Box maxWidth="400">
              <Flex py="5">
                <Text flex="1" fontSize="lg">
                  Children: 0
                </Text>
              </Flex>
            </Box>
          </Container>
          <Container my="10">
            <Heading size="sm">Tell the host about yourself</Heading>
            Here is a sample placeholder
          </Container>
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
