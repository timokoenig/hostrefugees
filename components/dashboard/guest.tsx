import { Box, Container, Flex, Heading, List, Stack } from '@chakra-ui/react'
import React from 'react'
import { BathroomType, PlaceType, Request, UserRole } from '../../utils/model'
import RequestItem from './request-item'

const Guest = () => {
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
      <Box>
        <Flex mb="5" textAlign="center">
          <Heading size="md">Your Requests</Heading>
        </Flex>
        <Stack spacing={6}>
          <List spacing="2">
            {requests.map((request, i) => (
              <RequestItem key={i} request={request} />
            ))}
          </List>
        </Stack>
      </Box>
    </Container>
  )
}

export default Guest
