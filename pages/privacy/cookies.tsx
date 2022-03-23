import { Container, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React from 'react'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Layout from '../../components/layout'

const CookieForm = dynamic(() => import('../../components/privacy/cookie-form'), {
  ssr: false,
})

type Props = {
  user?: MappedUser
}

const HelpPage = (props: Props) => {
  return (
    <Layout user={props.user}>
      <Container maxW="7xl">
        <Heading as="h1" size="lg" mb="5">
          Privacy - Cookies
        </Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')} mb="5">
          We use cookies and similar technologies to provide certain features, enhance the user
          experience and deliver content that is relevant to your interests. Depending on their
          purpose, analysis and marketing cookies may be used in addition to technically necessary
          cookies.
        </Text>
        <Text color={useColorModeValue('gray.600', 'gray.400')} mb="10">
          You can decide which cookies are used by selecting the respective options below. Please
          note that your selection may impair the functionality of the service.
        </Text>
        <CookieForm />
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

export default HelpPage
