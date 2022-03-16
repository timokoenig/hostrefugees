import { Button, Center, Container, Heading, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Layout from '../../../components/layout'

type Props = {
  user?: MappedUser
}

const RequestPage = (props: Props) => {
  const router = useRouter()
  return (
    <Layout user={props.user}>
      <Container maxW="7xl" textAlign="center" maxWidth="700">
        <Center>
          <Image src="/svg/undraw_completing_re_i7ap.svg" maxWidth="250" />
        </Center>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Your Request has been sent
        </Heading>
        <Text color="gray.500">
          You will receive a confirmation email when the host accepts your request to stay
        </Text>
        <Button my="10" onClick={() => router.replace('/')}>
          Check out the StarterKit for Germany
        </Button>
        <Text>or</Text>

        <Button my="10" onClick={() => router.replace('/dashboard')}>
          Check out your pending requests
        </Button>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user === undefined) {
    return {
      redirect: {
        destination: `/`,
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
