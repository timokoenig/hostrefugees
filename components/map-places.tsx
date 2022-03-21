import { Box, Container, Heading, List, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import GoogleMapReact from 'google-map-react'
import _ from 'lodash'
import React from 'react'
import { MappedPlace } from '../utils/models'
import Marker from './map/marker'
import MoreItem from './map/more-item'
import PlaceItem from './place/item'
import { MarkerItem } from './place/map'

type Props = {
  places: MappedPlace[]
}

export default function MapPlaces(props: Props) {
  const markerItems: MarkerItem[] = props.places.map(place => {
    return {
      city: place.addressCity,
      lat: place.addressCityLat ?? '0.0',
      lng: place.addressCityLng ?? '0.0',
    }
  })
  const groupedItems = _.groupBy(markerItems, 'city')

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
        <Stack height="50vh" borderRadius="lg" overflow="hidden">
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string }}
            defaultCenter={{ lat: 51.1657, lng: 10.4515 }} // center of Germany
            defaultZoom={6}
            options={{
              zoomControl: false,
              fullscreenControl: false,
            }}
          >
            {Object.keys(groupedItems).map(key => {
              const items = groupedItems[key] as MarkerItem[]
              return (
                <Marker
                  key={key}
                  title={items.length.toString()}
                  lat={items[0].lat}
                  lng={items[0].lng}
                />
              )
            })}
          </GoogleMapReact>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
