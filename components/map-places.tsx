import { Box, Container, Heading, List, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MappedPlace } from '../utils/models'
import MoreItem from './map/more-item'
import PlaceItem from './place/item'

const GoogleMaps = dynamic(() => import('./googlemaps'), {
  ssr: false,
})

type Props = {
  googleMapsKey: string
  places: MappedPlace[]
}

const MapPlaces = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Container maxW="7xl" py={10} mb="20">
      <Box mb="5" textAlign="center">
        <Heading>{t('place.available')}</Heading>
      </Box>
      <SimpleGrid templateColumns={{ sm: '1fr', md: '1fr 1fr' }} spacing={8}>
        <Stack spacing={6}>
          <List spacing="2">
            {props.places.length == 0 && (
              <Text textAlign="center" p="10" fontWeight="semibold">
                {t('place.empty')}
              </Text>
            )}
            {props.places.slice(0, 4).map((place, i) => (
              <PlaceItem key={i} place={place} />
            ))}
            {props.places.length > 0 && <MoreItem />}
          </List>
        </Stack>
        <GoogleMaps apiKey={props.googleMapsKey} height="50vh" places={props.places} />
      </SimpleGrid>
    </Container>
  )
}

export default MapPlaces
