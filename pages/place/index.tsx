import { Box, Button, Container, Heading, List, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import PlaceItem from 'components/place/item'
import Map from 'components/place/map'
import prisma from 'prisma/client'
import React from 'react'
import { mapPlace } from 'utils/mapper'
import { MappedPlace, MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Layout from '../../components/layout'
import FilterModal from '../../components/place/filter-modal'
import { app, setFilter } from '../../state/app'

type Props = {
  user?: MappedUser
  places: MappedPlace[]
}

const PlacePage = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const appState = app.use()
  const filterCount = (() => {
    let count = 0
    if (appState.filter.adults !== null) count += 1
    if (appState.filter.children !== null) count += 1
    if (appState.filter.city !== null) count += 1
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
    return true
  }
  const filteredPlaces = props.places.filter(filterPlace)

  return (
    <Layout user={props.user}>
      <Container maxW="7xl">
        <Heading mb="10">
          {filteredPlaces.length} Places Available{' '}
          <Button size="sm" ml="5" colorScheme={filterCount > 0 ? 'blue' : 'gray'} onClick={onOpen}>
            Filter{filterCount > 0 ? ` (${filterCount})` : ''}
          </Button>
        </Heading>
        <SimpleGrid columns={2} spacing="10">
          <List spacing="5">
            {filteredPlaces.map((place, i) => (
              <PlaceItem key={i} place={place} />
            ))}
          </List>
          <Box>
            <Map places={props.places} onClick={city => setFilter({ ...appState.filter, city })} />
          </Box>
        </SimpleGrid>
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
      approved: true,
      active: true,
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
  })
  return {
    props: {
      user: context.req.session.user ?? null,
      places: places.map(mapPlace),
    },
  }
})

export default PlacePage
