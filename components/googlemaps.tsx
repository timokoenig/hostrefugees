/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, Button, Flex, Image, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import Marker from 'components/map/marker'
import cookieCutter from 'cookie-cutter'
import GoogleMapReact from 'google-map-react'
import _ from 'lodash'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import { MappedPlace } from 'utils/models'

export type MarkerItem = {
  city: string
  lat: string
  lng: string
}

const Placeholder = ({ height }: { height: string }) => {
  const router = useRouter()

  const enableCookies = () => {
    cookieCutter.set('cookie-consent', 'technically_required,analytics,marketing', {
      path: '/',
      expires: moment().add(1, 'year').toDate(),
    })
    router.reload()
  }

  return (
    <Box height={height} borderRadius="lg" overflow="hidden" position="relative">
      <Box
        width="100%"
        height="100%"
        backgroundColor={useColorModeValue('gray.200', 'gray.500')}
        opacity={0.5}
        position="absolute"
        top="0"
      />
      <Flex position="absolute" width="100%" height="100%" align="center" justifyContent="center">
        <Stack
          backgroundColor={useColorModeValue('gray.300', 'gray.700')}
          p="5"
          m="10"
          rounded="lg"
          textAlign="center"
          spacing="5"
        >
          <Text fontWeight="semibold" fontSize="lg">
            Google Maps Disabled
          </Text>
          <Text>
            This website uses Google Maps to display places in Germany. To enable this feature,
            please allow the usage of non-essential cookies.
          </Text>
          <Text>
            For further information, please refer to our{' '}
            <Link href="/privacy" fontWeight="semibold">
              Privacy Policy
            </Link>
            .
          </Text>
          <Button colorScheme="blue" onClick={enableCookies}>
            Enable Cookies
          </Button>
        </Stack>
      </Flex>
      <Image src="/googlemaps-placeholder.png" width="100%" height="100%" fit="cover" />
    </Box>
  )
}

type Props = {
  height: string
  places: MappedPlace[]
  onClick?: (city: string) => void
}

const GoogleMaps = (props: Props) => {
  if (
    cookieCutter.get('cookie-consent') === undefined ||
    !cookieCutter.get('cookie-consent').includes('marketing') ||
    !cookieCutter.get('cookie-consent').includes('analytics')
  ) {
    // User did not accept the marketing and analytics cookies, therefore we need to show a placeholder instead of GoogleMaps
    return <Placeholder height={props.height} />
  }

  const markerItems: MarkerItem[] = props.places.map(place => {
    return {
      city: place.addressCity,
      lat: place.addressCityLat ?? '0.0',
      lng: place.addressCityLng ?? '0.0',
    }
  })
  const groupedItems = _.groupBy(markerItems, 'city')

  return (
    <Stack height={props.height} borderRadius="lg" overflow="hidden">
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
              onClick={() => {
                if (!props.onClick) return
                props.onClick(key)
              }}
            />
          )
        })}
      </GoogleMapReact>
    </Stack>
  )
}

export default GoogleMaps
