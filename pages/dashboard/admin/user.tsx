import { ArrowBackIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
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

const UserPage = (props: Props) => {
  const router = useRouter()

  const verify = async (user: User) => {
    const res = await fetch(`/api/user/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        verified: true,
      }),
    })
    if (res.ok) {
      router.reload()
    }
  }

  return (
    <Layout user={props.user}>
      <Head>
        <title>HostRefugees - Admin Dashboard</title>
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
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {props.users.map(user => (
              <Tr key={user.id}>
                <Td>{user.email}</Td>
                <Td>{user.firstname}</Td>
                <Td>{user.lastname}</Td>
                <Td>{user.role}</Td>
                <Td>
                  {user.verified ? (
                    <Badge colorScheme="green">Verified</Badge>
                  ) : (
                    <Badge colorScheme="red">Not Verified</Badge>
                  )}
                </Td>
                <Td>
                  <Menu>
                    <MenuButton as="button">
                      <HamburgerIcon width="5" height="5" />
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => verify(user)}>Verify</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
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