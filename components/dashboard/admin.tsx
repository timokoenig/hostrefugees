import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Badge,
  Box,
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
import { User } from '@prisma/client'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  users: User[]
}

const Admin = (props: Props) => {
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
    <Container px={0} maxW="7xl" py={10}>
      <Box>
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
      </Box>
    </Container>
  )
}

export default Admin
