import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react'
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
  city: string[]
  category: string[]
}

const PostComponent = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [filter, setFilter] = useState<Filter>({ city: [], category: [] })

  const filteredPosts = props.posts
    .filter(post => {
      if (filter.city.length > 0 && post.addressCity) {
        return filter.city.includes(post.addressCity)
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
      <SimpleGrid mb="10" columns={{ base: 1, md: 2 }}>
        <Heading fontSize="4xl">{t('posts')}</Heading>
        <Box textAlign="right">
          <CustomButton size="md" title={t('post.new')} onClick={() => router.push('/post/new')} />
        </Box>
      </SimpleGrid>
      <Box>
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
        <Box sx={{ columnCount: { base: 1, md: 2, lg: 3 }, columnGap: '8px' }}>
          {filteredPosts.map(post => (
            <PostItem key={post.id} post={post} active={props.selectedPostId == post.id} />
          ))}
        </Box>
      </Box>
    </Container>
  )
}

export default PostComponent
