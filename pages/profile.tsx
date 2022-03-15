import {
  Button,
  Container,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import Layout from 'components/layout'
import Spacer from 'components/spacer'
import Head from 'next/head'
import React, { useState } from 'react'
import { User } from 'utils/model'
import { withSessionSsr } from 'utils/session'
import Footer from '../components/footer'
import Navigation from '../components/navigation'

type Props = {
  user?: User
}

const ProfilePage = (props: Props) => {
  const [firstname, setFirstname] = useState<string>(props.user?.firstname ?? '')
  const [lastname, setLastname] = useState<string>(props.user?.lastname ?? '')
  return (
    <>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Layout>
        <Navigation user={props.user} />
        <Container maxW="7xl">
          <Heading as="h2" size="xl" mb="5">
            Profile
          </Heading>
          <SimpleGrid columns={4} spacing="10">
            <GridItem colSpan={3}>
              <FormControl mb="5">
                <FormLabel htmlFor="firstname">First Name</FormLabel>
                <Input
                  id="firstname"
                  type="firstname"
                  value={firstname}
                  isDisabled={true}
                  onChange={e => setFirstname(e.target.value)}
                />
              </FormControl>
              <FormControl mb="5">
                <FormLabel htmlFor="lastname">Last Name</FormLabel>
                <Input
                  id="lastname"
                  type="lastname"
                  value={lastname}
                  isDisabled={true}
                  onChange={e => setLastname(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input id="email" type="email" value={props.user?.email ?? ''} isDisabled={true} />
              </FormControl>
            </GridItem>
            <GridItem>
              <Heading size="md" mb="5">
                Info
              </Heading>
              <Text mb="20">
                You can not update your profile at the moment. We are working on a solution.
              </Text>
              <Button colorScheme="red" variant="ghost">
                Delete Account
              </Button>
            </GridItem>
          </SimpleGrid>
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
      user: context.req.session.user ?? null,
    },
  }
})

export default ProfilePage
