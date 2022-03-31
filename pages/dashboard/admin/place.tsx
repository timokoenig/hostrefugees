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
import { Place, UserRole } from '@prisma/client'
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
  places: (Place & { author: { firstname: string; lastname: string } })[]
}

const PlacePage = (props: Props) => {
  const router = useRouter()

  return (
    <Layout user={props.user}>
      <Head>
        <title>HostRefugees - Admin Dashboard</title>
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
          <Heading size="md">Places</Heading>
        </Flex>
        <Table>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Author</Th>
              <Th>Title</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.places.map(place => (
              <Tr key={place.id}>
                <Td>{moment(place.createdAt).format('DD.MM.YYYY HH:mm')}</Td>
                <Td>{`${place.author.firstname} ${place.author.lastname}`}</Td>
                <Td>{place.title}</Td>
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

  const places = await prisma.place.findMany({
    include: {
      author: {
        select: {
          firstname: true,
          lastname: true,
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
      places,
    },
  }
})

export default PlacePage
