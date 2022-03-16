import { Stack } from '@chakra-ui/react'
import Marker from 'components/map/marker'
import GoogleMapReact from 'google-map-react'
import React from 'react'
import { Place } from 'utils/model'

type Props = {
  places: Place[]
  onClick: () => void
}

export default function Map(props: Props) {
  const markerItems: { title: string; lat: number; lng: number }[] = props.places.map(place => {
    return {
      title: place.addressCity,
      lat: place.addressCityLat ?? 0.0,
      lng: place.addressCityLng ?? 0.0,
    }
  })
  return (
    <Stack height="80vh">
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={{ lat: 53.551086, lng: 9.993682 }}
        defaultZoom={11}
      >
        {markerItems.map((marker, i) => (
          <Marker key={i} lat={marker.lat} lng={marker.lng} onClick={props.onClick} />
        ))}
      </GoogleMapReact>
    </Stack>
  )
}
