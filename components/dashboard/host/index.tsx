import { Box, Container, Flex, Heading, List, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Place, Post, Request } from '@prisma/client'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { mapPlace } from 'utils/mapper'
import Button from '../../common/button'
import PlaceItem from '../../place/item'
import PostItem from '../post-item'
import RequestItem from '../request-item'

type Props = {
  places: Place[]
  requests: Request[]
  posts: Post[]
}

const Host = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  return (
    <Container px={0} maxW="7xl" py={10}>
      <SimpleGrid templateColumns={{ sm: '1fr', md: '1fr 1fr' }} spacing={8} mb="10">
        <Box>
          <Flex mb="5" textAlign="center">
            <Heading size="md" flex="1" textAlign="left">
              {t('dashboard.host.places')}
            </Heading>
            <Button
              title={t('new').toUpperCase()}
              size="sm"
              onClick={() => router.push('/dashboard/place/new')}
            />
          </Flex>
          <Stack spacing={6}>
            {props.places.length == 0 && <Text>{t('dashboard.noplaces')}</Text>}
            <List spacing="2">
              {props.places.map((place, i) => (
                <PlaceItem
                  key={i}
                  place={mapPlace(place)}
                  onClick={() => router.push(`/dashboard/place/${place.id}`)}
                />
              ))}
            </List>
          </Stack>
        </Box>
        <Box>
          <Flex mb="5" textAlign="center">
            <Heading size="md" flex="1" textAlign="left">
              {t('dashboard.host.requests')}
            </Heading>
            <Button
              title={t('archive').toUpperCase()}
              size="sm"
              onClick={() => router.push('/dashboard/request/archive')}
            />
          </Flex>
          <Stack spacing={6}>
            {props.requests.length == 0 && <Text>{t('dashboard.norequests')}</Text>}
            <List spacing="2">
              {props.requests.map((req, i) => (
                <RequestItem key={i} request={req} />
              ))}
            </List>
          </Stack>
        </Box>
      </SimpleGrid>
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
    </Container>
  )
}

export default Host
