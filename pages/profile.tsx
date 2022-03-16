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
import { User } from '@prisma/client'
import Layout from 'components/layout'
import Head from 'next/head'
import prisma from 'prisma/client'
import React, { useState } from 'react'
import { withSessionSsr } from 'utils/session'

type Props = {
  user?: User
}

const ProfilePage = (props: Props) => {
  const [firstname, setFirstname] = useState<string>(props.user?.firstname ?? '')
  const [lastname, setLastname] = useState<string>(props.user?.lastname ?? '')
  return (
    <Layout user={props.user}>
      <Head>
        <title>HostRefugees</title>
      </Head>
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

  const user = await prisma.user.findUnique({
    where: {
      id: context.req.session.user?.id,
    },
  })

  return {
    props: {
      user,
    },
  }
})

export default ProfilePage
