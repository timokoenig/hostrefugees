import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Container, GridItem, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { Place, UserRole } from '@prisma/client'
import Layout from 'components/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Form from '../../../components/dashboard/place/form'

type Props = {
  user: MappedUser
}

const NewPage = (props: Props) => {
  const router = useRouter()

  const onCreate = async (place: Place) => {
    try {
      const res = await fetch('/api/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(place),
      })
      if (res.ok) {
        router.back()
      }
    } catch (err: unknown) {
      console.log(err)
    }
  }

  return (
    <Layout user={props.user}>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Container maxW="7xl">
        <Box mb="5">
          <Button variant="ghost" leftIcon={<ArrowBackIcon />} onClick={router.back}>
            Dashboard
          </Button>
        </Box>
        <Heading as="h2" size="lg" mb="10">
          Create New Place
        </Heading>
        <SimpleGrid columns={3} spacing={5}>
          <GridItem colSpan={2}>
            <Form onChange={onCreate} />
          </GridItem>
          <Box>
            <Text>Info</Text>
          </Box>
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user === undefined || context.req.session.user?.role === UserRole.GUEST) {
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

export default NewPage
