import { Box, Container, Heading, List, SimpleGrid, Stack } from '@chakra-ui/react'
import GoogleMapReact from 'google-map-react'
import React from 'react'
import { Place } from '../utils/model'
import Marker from './map/marker'
import MoreItem from './map/more-item'
import PlaceItem from './place/item'

type Props = {
  places: Place[]
}

export default function MapPlaces(props: Props) {
  const markerItems: { title: string; lat: number; lng: number }[] = props.places.map(place => {
    return {
      title: place.addressCity,
      lat: place.addressCityLat ?? 0.0,
      lng: place.addressCityLng ?? 0.0,
    }
  })
  return (
    <Container maxW="7xl" py={10}>
      <Box mb="5" textAlign="center">
        <Heading>Available Homes</Heading>
      </Box>
      <SimpleGrid templateColumns={{ sm: '1fr', md: '1fr 1fr' }} spacing={8}>
        <Stack spacing={6}>
          <List spacing="2">
            {props.places.map((place, i) => (
              <PlaceItem key={i} place={place} />
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
            {markerItems.map((marker, i) => (
              <Marker key={i} lat={marker.lat} lng={marker.lng} />
            ))}
          </GoogleMapReact>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
