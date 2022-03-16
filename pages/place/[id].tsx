import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Center } from '@chakra-ui/react'
import Detail from 'components/place/detail'
import { useRouter } from 'next/router'
import React from 'react'
import { BathroomType, Place, PlaceType, User, UserRole } from 'utils/model'
import { withSessionSsr } from 'utils/session'
import Footer from '../../components/footer'
import Layout from '../../components/layout'
import Navigation from '../../components/navigation'
import Spacer from '../../components/spacer'

type Props = {
  user?: User
  place: Place
}

const PlaceDetailPage = (props: Props) => {
  const router = useRouter()
  return (
    <Layout>
      <Navigation user={props.user} />
      <Center>
        <Box maxW="7xl">
          <Box mb="5">
            <Button
              variant="ghost"
              leftIcon={<ArrowBackIcon />}
              onClick={() => router.push('/place')}
            >
              Available Places
            </Button>
          </Box>
          <Detail place={props.place} />
        </Box>
      </Center>
      <Spacer />
      <Footer />
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  return {
    props: {
      user: context.req.session.user ?? null,
      place: {
        id: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
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
        availabilityStart: new Date().toISOString(),
      },
    },
  }
})

export default PlaceDetailPage
