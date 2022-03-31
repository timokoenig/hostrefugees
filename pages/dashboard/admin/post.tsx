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
import { Post, UserRole } from '@prisma/client'
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
  posts: Post[]
}

const PostPage = (props: Props) => {
  const router = useRouter()

  const approve = async (post: Post) => {
    const res = await fetch(`/api/post/${post.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        approved: true,
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
            pl="0"
            variant="ghost"
            leftIcon={<ArrowBackIcon />}
            onClick={() => router.push('/dashboard/admin')}
          >
            Dashboard
          </Button>
        </Box>
        <Flex mb="5" textAlign="center">
          <Heading size="md">Posts</Heading>
        </Flex>
        <Table>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Title</Th>
              <Th>Approved</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {props.posts.map(post => (
              <Tr key={post.id}>
                <Td>{moment(post.createdAt).format('DD.MM.YYYY HH:mm')}</Td>
                <Td>{post.title}</Td>
                <Td>
                  {post.approved ? (
                    <Badge colorScheme="green">Approved</Badge>
                  ) : (
                    <Badge colorScheme="red">Not Approved</Badge>
                  )}
                </Td>
                <Td>
                  <Menu>
                    <MenuButton as="button">
                      <HamburgerIcon width="5" height="5" />
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => approve(post)}>Approve</MenuItem>
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

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return {
    props: {
      user: context.req.session.user,
      posts,
    },
  }
})

export default PostPage
