import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Badge,
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
  useColorModeValue,
} from '@chakra-ui/react'
import { User, UserRole } from '@prisma/client'
import Layout from 'components/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import prisma from 'prisma/client'
import React from 'react'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'

type Props = {
  user: MappedUser
  users: User[]
}

const VerifiedBadge = (props: { user: User }) => {
  if (props.user.verified) return <Badge colorScheme="green">Verified</Badge>
  return <Badge colorScheme="red">Not Verified</Badge>
}

const UserPage = (props: Props) => {
  const router = useRouter()
  const hoverColor = useColorModeValue('gray.100', 'gray.900')

  return (
    <Layout user={props.user}>
      <Head>
        <title>HostRefugees - Admin Users</title>
      </Head>
      <Container maxW="7xl">
        <Box mb="5">
          <Button
            variant="ghost"
            leftIcon={<ArrowBackIcon />}
            onClick={() => router.push('/dashboard/admin')}
          >
            Dashboard
          </Button>
        </Box>
        <Flex mb="5" textAlign="center">
          <Heading size="md">Users</Heading>
        </Flex>
        <Table>
          <Thead>
            <Tr>
              <Th>Email</Th>
              <Th>Firstname</Th>
              <Th>Lastname</Th>
              <Th>Role</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.users.map(user => (
              <Tr
                key={user.id}
                onClick={() => router.push(`/dashboard/admin/user/${user.id}`)}
                _hover={{ backgroundColor: hoverColor }}
                cursor="pointer"
              >
                <Td>{user.email}</Td>
                <Td>{user.firstname}</Td>
                <Td>{user.lastname}</Td>
                <Td>{user.role}</Td>
                <Td>{user.role == UserRole.HOST && <VerifiedBadge user={user} />}</Td>
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

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return {
    props: {
      user: context.req.session.user,
      users,
    },
  }
})

export default UserPage
