import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Request, UserRole } from '@prisma/client'
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
  requests: (Request & {
    place: { title: string }
    author: { firstname: string; lastname: string }
  })[]
}

const RequestPage = (props: Props) => {
  const router = useRouter()

  return (
    <Layout user={props.user}>
      <Head>
        <title>HostRefugees - Admin Requests</title>
      </Head>
      <Container maxW="7xl">
        <Box mb="5">
          <Button
            pl="0"
            variant="ghost"
            leftIcon={<ArrowBackIcon />}
            onClick={() => router.push('/dashboard/admin')}
          >
            Dashboard
          </Button>
        </Box>
        <Flex mb="5" textAlign="center">
          <Heading size="md">Requests</Heading>
        </Flex>
        <Table>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Author</Th>
              <Th>Place</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.requests.map(request => (
              <Tr key={request.id}>
                <Td>{moment(request.createdAt).format('DD.MM.YYYY HH:mm')}</Td>
                <Td>{`${request.author.firstname} ${request.author.lastname}`}</Td>
                <Td>{request.place.title}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user == undefined || context.req.session.user.role != UserRole.ADMIN) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  const requests = await prisma.request.findMany({
    include: {
      author: {
        select: {
          firstname: true,
          lastname: true,
        },
      },
      place: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return {
    props: {
      user: context.req.session.user,
      requests,
    },
  }
})

export default RequestPage
