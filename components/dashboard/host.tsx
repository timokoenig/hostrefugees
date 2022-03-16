import { Box, Container, Flex, Heading, List, SimpleGrid, Stack } from '@chakra-ui/react'
import { Place, Request } from '@prisma/client'
import { useRouter } from 'next/router'
import React from 'react'
import { mapPlace } from 'utils/mapper'
import Button from '../common/button'
import PlaceItem from '../place/item'
import RequestItem from './request-item'

type Props = {
  places: Place[]
  requests: Request[]
}

const Host = (props: Props) => {
  const router = useRouter()
  return (
    <Container maxW="7xl" py={10}>
      <SimpleGrid templateColumns={{ sm: '1fr', md: '1fr 1fr' }} spacing={8}>
        <Box>
          <Flex mb="5" textAlign="center">
            <Heading size="md" flex="1" textAlign="left">
              Your Places
            </Heading>
            <Button title="NEW" size="sm" onClick={() => router.push('/dashboard/place/new')} />
          </Flex>
          <Stack spacing={6}>
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
              Stay Requests
            </Heading>
            <Button
              title="ARCHIVE"
              size="sm"
              onClick={() => router.push('/dashboard/request/archive')}
            />
          </Flex>
          <Stack spacing={6}>
            <List spacing="2">
              {props.requests.map((req, i) => (
                <RequestItem key={i} request={req} />
              ))}
            </List>
          </Stack>
        </Box>
      </SimpleGrid>
    </Container>
  )
}

export default Host
