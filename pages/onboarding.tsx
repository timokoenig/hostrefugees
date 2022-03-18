import { Button, Center, Container, Heading, Image, Text } from '@chakra-ui/react'
import LanguagePicker from 'components/common/languagepicker'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Layout from '../components/layout'

type Props = {
  user: MappedUser
}

const OnboardingPage = (props: Props) => {
  const router = useRouter()
  const [languages, setLanguages] = useState<string[]>([])

  console.log(languages)

  return (
    <Layout user={props.user}>
      <Container maxW="7xl" textAlign="center" maxWidth="700">
        <Heading as="h2" size="xl" mt={6} mb={10}>
          We are happy to welcome you at{' '}
          <Text as="span" color="blue.400">
            HostRefugees
          </Text>
        </Heading>
        <Center mb={10}>
          <Image src="/svg/undraw_audio_conversation_re_ptsl.svg" maxWidth="250" />
        </Center>
        <Text color="gray.500" mb="5">
          To improve the communication for hosts and guests, please select all languages you speak
        </Text>
        <LanguagePicker onChange={setLanguages} />
        <Button colorScheme="blue" my="10" onClick={() => router.push('/')}>
          Continue
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
      user: context.req.session.user,
    },
  }
})

export default OnboardingPage
