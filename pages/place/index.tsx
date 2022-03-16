import { Box, Button, Container, Heading, List, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import PlaceItem from 'components/place/item'
import Map from 'components/place/map'
import React, { useState } from 'react'
import { BathroomType, Place, PlaceType, User, UserRole } from 'utils/model'
import { withSessionSsr } from 'utils/session'
import Footer from '../../components/footer'
import Layout from '../../components/layout'
import Navigation from '../../components/navigation'
import FilterModal, { Filter } from '../../components/place/filter-modal'
import Spacer from '../../components/spacer'

type Props = {
  user?: User
}

const PlacePage = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [filter, setFilter] = useState<Filter>({ adults: null, children: null })
  const filterCount = (() => {
    let count = 0
    if (filter.adults !== null) count += 1
    if (filter.children !== null) count += 1
    return count
  })()

  const places: Place[] = [
    {
      id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        id: '1',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: UserRole.Guest,
        languages: [],
      },
      title: '1 Bedroom Apartment',
      addressCity: 'Hamburg',
      rooms: 1,
      beds: 1,
      approved: true,
      active: true,
      description: '',
      type: PlaceType.Private,
      bathroom: BathroomType.Shared,
      adults: 1,
      children: 0,
      addressStreet: '',
      addressHouseNumber: '',
      addressCountry: '',
      addressZip: '',
      houseRules: '',
      availabilityStart: new Date(),
    },
  ]

  return (
    <Layout>
      <Navigation user={props.user} />
      <Container maxW="7xl">
        <Heading mb="10">
          {places.length} Places Available{' '}
          <Button size="sm" ml="5" colorScheme="blue" onClick={onOpen}>
            Filter{filterCount > 0 ? ` (${filterCount})` : ''}
          </Button>
        </Heading>
        <SimpleGrid columns={2} spacing="10">
          <List spacing="5">
            {places.map((place, i) => (
              <PlaceItem key={i} place={place} />
            ))}
          </List>
          <Box>
            <Map />
          </Box>
        </SimpleGrid>
      </Container>
      <Spacer />
      <Footer />
      <FilterModal filter={filter} onChange={setFilter} isOpen={isOpen} onClose={onClose} />
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  return {
    props: {
      user: context.req.session.user ?? null,
    },
  }
})

export default PlacePage
