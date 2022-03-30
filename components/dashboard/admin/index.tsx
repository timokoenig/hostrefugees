import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  StackDivider,
  useColorModeValue,
} from '@chakra-ui/react'
import { Post, User } from '@prisma/client'
import React from 'react'
import PostItem from './post-item'
import Stats from './stats'
import UserItem from './user-item'

type Props = {
  usersCount: number
  usersChange: number
  placesCount: number
  placesChange: number
  requestsCount: number
  requestsChange: number
  postsCount: number
  postsChange: number
  users: User[]
  posts: Post[]
}

const Admin = (props: Props) => {
  return (
    <Container px={0} maxW="7xl" py={10}>
      <Stats {...props} />
      <SimpleGrid templateColumns={{ md: '1fr', lg: '1fr 1fr' }} spacing="10">
        <Box>
          <Flex mb="5" textAlign="center">
            <Heading size="md">Unverified Hosts</Heading>
          </Flex>
          <Stack
            spacing={5}
            divider={<StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />}
          >
            {props.users.map(user => (
              <UserItem key={user.id} user={user} />
            ))}
          </Stack>
        </Box>
        <Box>
          <Flex mb="5" textAlign="center">
            <Heading size="md">New Posts</Heading>
          </Flex>
          <Stack
            spacing={5}
            divider={<StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />}
          >
            {props.posts.map(post => (
              <PostItem key={post.id} post={post} />
            ))}
          </Stack>
        </Box>
      </SimpleGrid>
    </Container>
  )
}

export default Admin
