import { Box, Container, Heading, List, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React from 'react'
import { MappedPlace } from '../utils/models'
import MoreItem from './map/more-item'
import PlaceItem from './place/item'

const GoogleMaps = dynamic(() => import('./googlemaps'), {
  ssr: false,
})

type Props = {
  places: MappedPlace[]
}

const MapPlaces = (props: Props) => {
  return (
    <Container maxW="7xl" py={10}>
      <Box mb="5" textAlign="center">
        <Heading>Available Homes</Heading>
      </Box>
      <SimpleGrid templateColumns={{ sm: '1fr', md: '1fr 1fr' }} spacing={8}>
        <Stack spacing={6}>
          <List spacing="2">
            {props.places.length == 0 && (
              <Text textAlign="center" p="10" fontWeight="semibold">
                No Places Available
              </Text>
            )}
            {props.places.map((place, i) => (
              <PlaceItem key={i} place={place} />
            ))}
            {props.places.length > 0 && <MoreItem />}
          </List>
        </Stack>
        <GoogleMaps height="50vh" places={props.places} />
      </SimpleGrid>
    </Container>
  )
}

export default MapPlaces
