import { Box, Center, Container, Heading } from '@chakra-ui/react'
import { Post } from '@prisma/client'
import Layout from 'components/layout'
import PostItem from 'components/post/item'
import prisma from 'prisma/client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'

type Props = {
  user?: MappedUser
  posts: Post[]
}

const PostPage = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Layout user={props.user}>
      <Container maxW="7xl">
        <Center mb="10">
          <Heading fontSize="4xl">{t('posts')}</Heading>
        </Center>
        <Box w="100%" sx={{ columnCount: { base: 1, md: 2, lg: 3 }, columnGap: '8px' }}>
          {props.posts.map(post => (
            <PostItem key={post.id} post={post} />
          ))}
        </Box>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  const posts = await prisma.post.findMany({
    where: {
      approved: true,
    },
  })
  return {
    props: {
      user: context.req.session.user ?? null,
      posts,
    },
  }
})

export default PostPage
