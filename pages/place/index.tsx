import {
  Box,
  Button,
  Container,
  Heading,
  List,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { HostType } from '@prisma/client'
import PlaceItem from 'components/place/item'
import Waitlist from 'components/waitlist'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import prisma from 'prisma/client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { mapPlace } from 'utils/mapper'
import { MappedPlace, MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Layout from '../../components/layout'
import FilterModal from '../../components/place/filter-modal'
import { app, setFilter } from '../../state/app'

const GoogleMaps = dynamic(() => import('components/googlemaps'), {
  ssr: false,
})

type Props = {
  googleMapsKey: string
  user?: MappedUser & { waitlist: boolean }
  places: MappedPlace[]
}

const PlacePage = (props: Props) => {
  const { t } = useTranslation('common')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const appState = app.use()
  const filterCount = (() => {
    let count = 0
    if (appState.filter.adults !== null) count += 1
    if (appState.filter.children !== null) count += 1
    if (appState.filter.city !== null) count += 1
    if (appState.filter.petsOnly) count += 1
    return count
  })()

  const filterPlace = (place: MappedPlace): boolean => {
    if (appState.filter.adults !== null && place.adults < appState.filter.adults) {
      return false
    }
    if (appState.filter.children !== null && place.children < appState.filter.children) {
      return false
    }
    if (
      appState.filter.city !== null &&
      !place.addressCity.toLowerCase().includes(appState.filter.city.toLowerCase())
    ) {
      return false
    }
    if (appState.filter.petsOnly && place.hostType == HostType.PEOPLE) {
      return false
    }
    return true
  }
  const filteredPlaces = props.places.filter(filterPlace)

  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title.places')}</title>
      </Head>
      <Container maxW="7xl">
        <Heading mb="10">
          {filteredPlaces.length} {t('place.available')}{' '}
          <Button size="sm" ml="5" colorScheme={filterCount > 0 ? 'blue' : 'gray'} onClick={onOpen}>
            {t('filter')}
            {filterCount > 0 ? ` (${filterCount})` : ''}
          </Button>
        </Heading>
        <SimpleGrid templateColumns={{ sm: '1fr', md: '1fr 1fr' }} spacing="10">
          <List spacing="2">
            {filteredPlaces.length == 0 && (
              <Text textAlign="center" p="10" fontWeight="semibold">
                {t('place.empty')}
              </Text>
            )}
            {filteredPlaces.map((place, i) => (
              <PlaceItem key={i} place={place} />
            ))}
          </List>
          <Box>
            <GoogleMaps
              apiKey={props.googleMapsKey}
              height="80vh"
              places={props.places}
              onClick={city => setFilter({ ...appState.filter, city })}
            />
          </Box>
        </SimpleGrid>
        <Box mt="20">
          <Waitlist user={props.user} />
        </Box>
      </Container>
      <FilterModal
        filter={appState.filter}
        onChange={setFilter}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  const places = await prisma.place.findMany({
    where: {
      // approved: true,
      active: true,
      // author: {
      //   verified: true,
      // },
    },
    include: {
      author: {
        select: {
          id: true,
          firstname: true,
          languages: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const user = await prisma.user.findFirst({
    where: {
      id: context.req.session.user?.id,
    },
  })

  return {
    props: {
      googleMapsKey: process.env.GOOGLE_MAP_KEY ?? '',
      user: user ? { ...context.req.session.user, waitlist: user.waitlist } : null,
      places: places.map(mapPlace),
    },
  }
})

export default PlacePage
