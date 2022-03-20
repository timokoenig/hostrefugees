import {
  Box,
  Container,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Switch,
  Text,
} from '@chakra-ui/react'
import { User } from '@prisma/client'
import Layout from 'components/layout'
import Head from 'next/head'
import prisma from 'prisma/client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useColorMode from 'utils/color-mode'
import { withSessionSsr } from 'utils/session'

type Props = {
  user?: User
}

const ProfilePage = (props: Props) => {
  const { t } = useTranslation('common')
  const { toggleColorMode, newColorMode } = useColorMode()
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
        <SimpleGrid templateColumns={{ sm: '1fr', md: '3fr 1fr' }} spacing="10">
          <GridItem>
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
            <FormControl mb="5">
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input id="email" type="email" value={props.user?.email ?? ''} isDisabled={true} />
            </FormControl>
            <FormControl mb="5">
              <FormLabel htmlFor="languages">Languages</FormLabel>
              <Input
                id="languages"
                type="languages"
                value={(props.user?.languages ?? []).map(lang => t(`lang.${lang}`)).join(', ')}
                isDisabled={true}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <Box>
              <Heading size="md" mb="5">
                Info
              </Heading>
              <Text mb="20">
                You can not update your profile at the moment. We are working on a solution.
              </Text>
            </Box>
            <Box>
              <Heading size="md" mb="5">
                Appearance
              </Heading>
              <Text mb="5">Switch between Dark and Light Mode</Text>
              <Switch size="lg" isChecked={newColorMode == 'light'} onChange={toggleColorMode} />
            </Box>
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
