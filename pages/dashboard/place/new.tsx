import { Box, Container, Heading } from '@chakra-ui/react'
import Layout from 'components/layout'
import Spacer from 'components/spacer'
import Head from 'next/head'
import React from 'react'
import { User, UserRole } from 'utils/model'
import { withSessionSsr } from 'utils/session'
import Create from '../../../components/dashboard/place/create'
import Footer from '../../../components/footer'
import Navigation from '../../../components/navigation'

type Props = {
  user?: User
}

const NewPage = (props: Props) => {
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
              New Place
            </Heading>
            <Create />
          </Box>
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

export default NewPage
