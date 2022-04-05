/* eslint-disable @typescript-eslint/no-for-in-array */
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'
import { Post, PostCategory } from '@prisma/client'
import CustomButton from 'components/common/button'
import Layout from 'components/layout'
import FilterModal from 'components/post/filter-modal'
import PostItem from 'components/post/item'
import Head from 'next/head'
import { useRouter } from 'next/router'
import prisma from 'prisma/client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'

type Props = {
  user?: MappedUser
  posts: Post[]
}

type Filter = {
  city: string
  category: string[]
}

const PostPage = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [filter, setFilter] = useState<Filter>({ city: '', category: [] })
  const filterCount = (() => {
    let count = 0
    if (filter.city != '') {
      count++
    }
    if (filter.category.length > 0) {
      count++
    }
    return count
  })()

  const filteredPosts = props.posts
    .filter(post => {
      if (filter.city != '') {
        return post.addressCity == filter.city
      }
      return true
    })
    .filter(post => {
      if (filter.category.length > 0) {
        for (let i = 0; i < filter.category.length; i++) {
          if (post.category.includes(filter.category[i] as PostCategory)) {
            return true
          }
        }
        return false
      }
      return true
    })

  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title.posts')}</title>
      </Head>
      <Container maxW="7xl">
        <Center mb="2">
          <Heading fontSize="4xl">{t('posts')}</Heading>
        </Center>
        <Flex mb="10">
          <Button size="md" ml="5" colorScheme={filterCount > 0 ? 'blue' : 'gray'} onClick={onOpen}>
            {t('filter')}
            {filterCount > 0 ? ` (${filterCount})` : ''}
          </Button>
          <Spacer />
          <CustomButton size="md" title={t('post.new')} onClick={() => router.push('/post/new')} />
        </Flex>
        <Box w="100%" sx={{ columnCount: { base: 1, md: 2, lg: 3 }, columnGap: '8px' }}>
          {filteredPosts.map(post => (
            <PostItem key={post.id} post={post} active={router.query.id == post.id} />
          ))}
        </Box>
      </Container>
      <FilterModal
        availableCities={[
          ...new Set(
            props.posts
              .map(post => (post.addressCity ? post.addressCity : ''))
              .filter(val => val.length > 0)
          ),
        ]}
        filter={filter}
        onChange={setFilter}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  const posts = await prisma.post.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: 'desc',
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
