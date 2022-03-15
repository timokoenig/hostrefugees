import { Box, Button, Container, Flex, Heading, List, SimpleGrid, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import PlaceItem from '../place/item'
import RequestItem from './request-item'

const Host = () => {
  const router = useRouter()
  const places = [1, 2, 3, 4]
  return (
    <Container maxW="7xl" py={10}>
      <SimpleGrid templateColumns={{ sm: '1fr', md: '1fr 1fr' }} spacing={8}>
        <Box>
          <Flex mb="5" textAlign="center">
            <Heading size="md" flex="1" textAlign="left">
              Your Homes
            </Heading>
            <Button colorScheme="blue" onClick={() => router.push('/dashboard/place/new')}>
              NEW
            </Button>
          </Flex>
          <Stack spacing={6}>
            <List spacing="2">
              {places.map((_, i) => (
                <PlaceItem key={i} onClick={() => router.push(`/dashboard/place/1`)} />
              ))}
            </List>
          </Stack>
        </Box>
        <Box>
          <Flex mb="5" textAlign="center">
            <Heading size="md">Stay Requests</Heading>
          </Flex>
          <Stack spacing={6}>
            <List spacing="2">
              {places.map((_, i) => (
                <RequestItem key={i} />
              ))}
            </List>
          </Stack>
        </Box>
      </SimpleGrid>
    </Container>
  )
}

export default Host
