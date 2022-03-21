import { Container } from '@chakra-ui/react'
import React from 'react'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Layout from '../components/layout'
import Welcome from '../components/welcome'

type Props = {
  user?: MappedUser
}

const WelcomePage = (props: Props) => {
  return (
    <Layout user={props.user}>
      <Container maxW="7xl">
        {/* <Center mb="10">
          <Heading as="h1" size="xl">
            Welcome To Germany
          </Heading>
        </Center>
        <Center mb="10">
          <Image src="/svg/undraw_a_whole_year_vnfm.svg" maxWidth="300" />
        </Center> */}
        <Welcome />
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

export default WelcomePage
