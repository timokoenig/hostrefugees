import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Container, GridItem, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { Place, UserRole } from '@prisma/client'
import Layout from 'components/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import prisma from 'prisma/client'
import React from 'react'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Form from '../../../components/dashboard/place/form'

type Props = {
  user: MappedUser
  place: Place
}

const PlacePage = (props: Props) => {
  const router = useRouter()
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
          Update Place
        </Heading>
        <SimpleGrid columns={3} spacing={5}>
          <GridItem colSpan={2}>
            <Form place={props.place} />
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

  const place = await prisma.place.findUnique({
    where: {
      id: context.query.id as string,
    },
    include: {
      author: {
        select: {
          id: true,
          firstname: true,
          languages: true,
        },
      },
    },
  })
  if (place === null || place.author.id !== context.req.session.user?.id) {
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
      place,
    },
  }
})

export default PlacePage
