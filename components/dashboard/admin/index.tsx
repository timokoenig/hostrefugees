import { Box, Container, Flex, Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import { Post, Request, SafetyCheck, User } from '@prisma/client'
import { useRouter } from 'next/router'
import React from 'react'
import PostItem from './post-item'
import SafetyItem from './safety-item'
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
  safetyCheckRequests: (Request & { safetyChecks: SafetyCheck[] })[]
}

const Admin = (props: Props) => {
  const router = useRouter()
  return (
    <Container px={0} maxW="7xl" py={10}>
      <Stats {...props} />
      <SimpleGrid templateColumns={{ md: '1fr', lg: '1fr 1fr 1fr' }} spacing="10">
        <Box>
          <Flex mb="5" textAlign="center">
            <Heading size="md">Unverified Hosts</Heading>
          </Flex>
          <Stack>
            {props.users.map(user => (
              <UserItem
                key={user.id}
                user={user}
                onClick={() => router.push('/dashboard/admin/user')}
              />
            ))}
          </Stack>
        </Box>
        <Box>
          <Flex mb="5" textAlign="center">
            <Heading size="md">New Posts</Heading>
          </Flex>
          <Stack>
            {props.posts.map(post => (
              <PostItem
                key={post.id}
                post={post}
                onClick={() => router.push('/dashboard/admin/post')}
              />
            ))}
          </Stack>
        </Box>
        <Box>
          <Flex mb="5" textAlign="center">
            <Heading size="md">Safety Checks</Heading>
          </Flex>
          <Stack>
            {props.safetyCheckRequests.map(request => (
              <SafetyItem
                key={request.id}
                request={request}
                onClick={() => router.push('/dashboard/admin/request')}
              />
            ))}
          </Stack>
        </Box>
      </SimpleGrid>
    </Container>
  )
}

export default Admin
