import { Box, Container, Heading } from '@chakra-ui/react'
import Layout from 'components/layout'
import Head from 'next/head'
import React from 'react'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'

type Props = {
  user: MappedUser
}

const ArchivePage = (props: Props) => {
  return (
    <Layout user={props.user}>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Container maxW="7xl">
        <Box align="center">
          <Heading as="h2" size="xl">
            Request Archive
          </Heading>
        </Box>
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
    },
  }
})

export default ArchivePage
