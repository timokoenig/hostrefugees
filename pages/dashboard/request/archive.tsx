import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Heading, List, Stack } from '@chakra-ui/react'
import { Request } from '@prisma/client'
import RequestItem from 'components/dashboard/request-item'
import Layout from 'components/layout'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'
import prisma from 'prisma/client'
import React from 'react'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'

type Props = {
  user: MappedUser
  requests: Request[]
}

const ArchivePage = (props: Props) => {
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
        <Box align="center">
          <Heading as="h2" size="xl" mb="5">
            Request Archive
          </Heading>
        </Box>
        <Stack spacing={6}>
          <List spacing="2">
            {props.requests.map((request, i) => (
              <RequestItem key={i} request={request} />
            ))}
          </List>
        </Stack>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user == undefined) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  // The archive has all requests older than 14 days
  const requests = await prisma.request.findMany({
    where: {
      place: {
        author: {
          id: context.req.session.user.id,
        },
      },
      createdAt: {
        lt: moment().subtract(14, 'days').toDate(),
      },
    },
    include: {
      author: {
        select: {
          id: true,
          firstname: true,
          languages: true,
        },
      },
      place: true,
    },
  })

  return {
    props: {
      user: context.req.session.user,
      requests,
    },
  }
})

export default ArchivePage
