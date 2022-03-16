import { Box, Button, Container, Flex, Heading, List, SimpleGrid, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { BathroomType, Place, PlaceType, Request, UserRole } from 'utils/model'
import PlaceItem from '../place/item'
import RequestItem from './request-item'

const Host = () => {
  const router = useRouter()
  const places: Place[] = [
    {
      id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        id: '1',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: UserRole.Guest,
        languages: [],
      },
      title: '1 Bedroom Apartment',
      addressCity: 'Hamburg',
      rooms: 1,
      beds: 1,
      approved: true,
      active: true,
      description: '',
      type: PlaceType.Private,
      bathroom: BathroomType.Shared,
      adults: 1,
      children: 0,
      addressStreet: '',
      addressHouseNumber: '',
      addressCountry: '',
      addressZip: '',
      houseRules: '',
      availabilityStart: new Date(),
    },
  ]
  const requests: Request[] = [
    {
      id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        id: '1',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: UserRole.Guest,
        languages: [],
      },
      place: {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        author: {
          id: '1',
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          role: UserRole.Guest,
          languages: [],
        },
        title: '1 Bedroom Apartment',
        addressCity: 'Hamburg',
        rooms: 1,
        beds: 1,
        approved: true,
        active: true,
        description: '',
        type: PlaceType.Private,
        bathroom: BathroomType.Shared,
        adults: 1,
        children: 0,
        addressStreet: '',
        addressHouseNumber: '',
        addressCountry: '',
        addressZip: '',
        houseRules: '',
        availabilityStart: new Date(),
      },
      adults: 1,
      children: 0,
      about: '',
      startDate: new Date(),
    },
  ]
  return (
    <Container maxW="7xl" py={10}>
      <SimpleGrid templateColumns={{ sm: '1fr', md: '1fr 1fr' }} spacing={8}>
        <Box>
          <Flex mb="5" textAlign="center">
            <Heading size="md" flex="1" textAlign="left">
              Your Places
            </Heading>
            <Button colorScheme="blue" onClick={() => router.push('/dashboard/place/new')}>
              NEW
            </Button>
          </Flex>
          <Stack spacing={6}>
            <List spacing="2">
              {places.map((place, i) => (
                <PlaceItem
                  key={i}
                  place={place}
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
            <Button colorScheme="blue" onClick={() => router.push('/dashboard/request/archive')}>
              ARCHIVE
            </Button>
          </Flex>
          <Stack spacing={6}>
            <List spacing="2">
              {requests.map((req, i) => (
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
