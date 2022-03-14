import {
  Badge,
  Box,
  Container,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import GoogleMapReact from 'google-map-react'
import React from 'react'

const AnyReactComponent = ({ lat, lng }: { lat: number; lng: number }) => (
  <Box lat={lat} lng={lng} textAlign="center">
    <Box
      backgroundColor="blue.500"
      width="8"
      height="8"
      borderRadius="20"
      position="absolute"
      zIndex="1"
      mt="1"
      ml="1"
      cursor="pointer"
      _hover={{
        background: 'blue.400',
      }}
      _active={{
        background: 'blue.600',
      }}
    >
      <Text color="white" fontSize="lg" fontWeight="bold" height="100%" lineHeight="8">
        1
      </Text>
    </Box>
    <Box backgroundColor="blue.500" width="10" height="10" borderRadius="20" opacity="0.5" />
  </Box>
)

export default function MapPlaces() {
  const places = [1, 2, 3, 4]
  return (
    <Container maxW="7xl" py={10}>
      <Box mb="5" textAlign="center">
        <Heading>Available Homes</Heading>
      </Box>
      <SimpleGrid templateColumns={{ sm: '1fr', md: '1fr 1fr' }} spacing={8}>
        <Stack spacing={6}>
          <List spacing="2">
            {places.map((_, i) => (
              <PlaceItem key={i} />
            ))}
            <MoreItem />
          </List>
        </Stack>
        <Stack height="50vh">
          <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={{ lat: 53.551086, lng: 9.993682 }}
            defaultZoom={11}
          >
            <AnyReactComponent lat={53.551086} lng={9.993682} />
          </GoogleMapReact>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}

function PlaceItem() {
  const property = {
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
  }

  return (
    <ListItem>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        _hover={{ background: 'gray.100' }}
      >
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              New
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {property.beds} beds &bull; {property.baths} baths
            </Box>
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            {property.title}
          </Box>
          <Box>Available Now</Box>
        </Box>
      </Box>
    </ListItem>
  )
}

function MoreItem() {
  return (
    <ListItem>
      <Box
        // borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        _hover={{ background: 'gray.100' }}
        textAlign="center"
      >
        <Box p="6">
          <Text fontSize="lg" fontWeight="bold" color="blue.500">
            See More Places
          </Text>
        </Box>
      </Box>
    </ListItem>
  )
}
