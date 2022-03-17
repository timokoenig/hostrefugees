import { Stack } from '@chakra-ui/react'
import Marker from 'components/map/marker'
import GoogleMapReact from 'google-map-react'
import _ from 'lodash'
import React from 'react'
import { MappedPlace } from 'utils/models'

type Props = {
  places: MappedPlace[]
  onClick: (city: string) => void
}

export type MarkerItem = {
  city: string
  lat: string
  lng: string
}

export default function Map(props: Props) {
  const markerItems: MarkerItem[] = props.places.map(place => {
    return {
      city: place.addressCity,
      lat: place.addressCityLat ?? '0.0',
      lng: place.addressCityLng ?? '0.0',
    }
  })
  const groupedItems = _.groupBy(markerItems, 'city')

  return (
    <Stack height="80vh" borderRadius="lg" overflow="hidden">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string }}
        defaultCenter={{ lat: 51.1657, lng: 10.4515 }} // center of Germany
        defaultZoom={6}
      >
        {Object.keys(groupedItems).map(key => {
          const items = groupedItems[key] as MarkerItem[]
          return (
            <Marker
              key={key}
              title={items.length.toString()}
              lat={items[0].lat}
              lng={items[0].lng}
              onClick={() => props.onClick(key)}
            />
          )
        })}
      </GoogleMapReact>
    </Stack>
  )
}
