import { Box, Container, Flex, Heading, List, Stack, Text } from '@chakra-ui/react'
import { Post, Request } from '@prisma/client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import PostItem from '../post-item'
import RequestItem from '../request-item'

type Props = {
  requests: Request[]
  posts: Post[]
}

const Guest = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Container px={0} maxW="7xl" py={10}>
      <Box>
        <Flex mb="5" textAlign="center">
          <Heading size="md">{t('dashboard.guest.requests')}</Heading>
        </Flex>
        <Stack spacing={6} mb="10">
          <List spacing="2">
            {props.requests.length == 0 && <Text>{t('dashboard.norequests')}</Text>}
            {props.requests.map((request, i) => (
              <RequestItem key={i} request={request} />
            ))}
          </List>
        </Stack>
        <Flex mb="5" textAlign="center">
          <Heading size="md">{t('dashboard.posts')}</Heading>
        </Flex>
        <Stack spacing={6}>
          <List spacing="2">
            {props.posts.length == 0 && <Text>{t('dashboard.noposts')}</Text>}
            {props.posts.map((post, i) => (
              <PostItem key={i} post={post} />
            ))}
          </List>
        </Stack>
      </Box>
    </Container>
  )
}

export default Guest
