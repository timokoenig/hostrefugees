import { Box, Container, Heading, Text } from '@chakra-ui/react'
import Guest from 'components/dashboard/guest'
import Host from 'components/dashboard/host'
import Layout from 'components/layout'
import Spacer from 'components/spacer'
import Head from 'next/head'
import React from 'react'
import { User, UserRole } from 'utils/model'
import { withSessionSsr } from 'utils/session'
import Footer from '../../components/footer'
import Navigation from '../../components/navigation'

type Props = {
  user: User
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
          {props.user.role === UserRole.Guest && <Guest />}
          {props.user.role === UserRole.Host && <Host />}
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
    },
  }
})

export default DashboardPage
