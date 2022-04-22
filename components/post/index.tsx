import { Box, Center, Container, Flex, Heading, SimpleGrid, Spacer } from '@chakra-ui/react'
import { Post, PostCategory } from '@prisma/client'
import CustomButton from 'components/common/button'
import ActivityFilter from 'components/post/activity-filter'
import PostItem from 'components/post/item'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  posts: Post[]
  selectedPostId?: string
}

type Filter = {
  city: string
  category: string[]
}

const PostComponent = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [filter, setFilter] = useState<Filter>({ city: '', category: [] })

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
    <Container maxW="7xl">
      <Center mb="2">
        <Heading fontSize="4xl">{t('posts')}</Heading>
      </Center>
      <Flex mb="10">
        <Spacer />
        <CustomButton size="md" title={t('post.new')} onClick={() => router.push('/post/new')} />
      </Flex>
      <SimpleGrid templateColumns={{ sm: '1fr', md: '1fr 3fr', lg: '1fr 4fr' }} spacing={5}>
        <ActivityFilter
          availableCities={[
            ...new Set(
              props.posts
                .map(post => (post.addressCity ? post.addressCity : ''))
                .filter(val => val.length > 0)
            ),
          ]}
          filter={filter}
          onChange={setFilter}
        />
        <Box>
          <Box sx={{ columnCount: { base: 1, md: 2, lg: 3 }, columnGap: '8px' }}>
            {filteredPosts.map(post => (
              <PostItem key={post.id} post={post} active={props.selectedPostId == post.id} />
            ))}
          </Box>
        </Box>
      </SimpleGrid>
    </Container>
  )
}

export default PostComponent
