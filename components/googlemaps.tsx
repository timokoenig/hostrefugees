/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, Button, Flex, Image, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import Marker from 'components/map/marker'
import GoogleMapReact from 'google-map-react'
import _ from 'lodash'
import { useRouter } from 'next/router'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import useColorMode from 'utils/color-mode'
import { COOKIE_CONSENT, getCookie, setCookie } from 'utils/cookies'
import { MappedPlace } from 'utils/models'

export type MarkerItem = {
  city: string
  lat: string
  lng: string
}

const Placeholder = ({ height }: { height: string }) => {
  const { t } = useTranslation('common')
  const router = useRouter()

  const enableCookies = () => {
    setCookie(COOKIE_CONSENT, 'technically_required,analytics,marketing')
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
            {t('maps.disabled')}
          </Text>
          <Text>{t('maps.info')}</Text>
          <Text>
            <Trans i18nKey="maps.privacy" t={t}>
              a
              <Link href="/privacy" fontWeight="semibold">
                1
              </Link>
              b
            </Trans>
          </Text>
          <Button colorScheme="blue" onClick={enableCookies}>
            {t('maps.enablecookies')}
          </Button>
        </Stack>
      </Flex>
      <Image
        src="/googlemaps-placeholder.webp"
        width="100%"
        height="100%"
        fit="cover"
        loading="lazy"
      />
    </Box>
  )
}

type Props = {
  apiKey: string
  height: string
  places: MappedPlace[]
  onClick?: (city: string) => void
}

const GoogleMaps = (props: Props) => {
  const { isDarkMode } = useColorMode()
  if (
    getCookie(COOKIE_CONSENT) === undefined ||
    !getCookie(COOKIE_CONSENT)?.includes('marketing') ||
    !getCookie(COOKIE_CONSENT)?.includes('analytics')
  ) {
    // User did not accept the marketing and analytics cookies, therefore we need to show a placeholder instead of GoogleMaps
    return <Placeholder height={props.height} />
  }

  const language = localStorage.getItem('i18nextLng')?.substring(0, 2)
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
        bootstrapURLKeys={{ key: props.apiKey, language }}
        defaultCenter={{ lat: 51.1657, lng: 10.4515 }} // center of Germany
        defaultZoom={6}
        options={{
          zoomControl: false,
          fullscreenControl: false,
          styles: isDarkMode
            ? [
                { elementType: 'geometry', stylers: [{ color: '#2F855A' }] },
                { elementType: 'labels.text.stroke', stylers: [{ color: '#2F855A' }] },
                { elementType: 'labels.text.fill', stylers: [{ color: '#ffffff' }] },
                {
                  featureType: 'administrative.locality',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#ffffff' }],
                },
                {
                  featureType: 'administrative.country',
                  elementType: 'geometry.stroke',
                  stylers: [{ color: '#1C4532' }],
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry',
                  stylers: [{ color: '#38A169' }],
                },
                {
                  featureType: 'road.highway',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#f3d19c' }],
                },
                {
                  featureType: 'transit',
                  elementType: 'geometry',
                  stylers: [{ color: '#2f3948' }],
                },
                {
                  featureType: 'transit.station',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#d59563' }],
                },
                {
                  featureType: 'water',
                  elementType: 'geometry',
                  stylers: [{ color: '#2C5282' }],
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#515c6d' }],
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.stroke',
                  stylers: [{ color: '#2C5282' }],
                },
              ]
            : undefined,
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
