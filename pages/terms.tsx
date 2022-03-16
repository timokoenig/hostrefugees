import { Container, Heading } from '@chakra-ui/react'
import { User } from '@prisma/client'
import React from 'react'
import { withSessionSsr } from 'utils/session'
import Layout from '../components/layout'

type Props = {
  user?: User
}

const TermsPage = (props: Props) => {
  return (
    <Layout user={props.user}>
      <Container maxW="7xl">
        <Heading as="h1" size="lg" mb="5">
          Terms of Service
        </Heading>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  return {
    props: {
      user: context.req.session.user ?? null,
    },
  }
})

export default TermsPage
