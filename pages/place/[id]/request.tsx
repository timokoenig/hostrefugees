import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Container, SimpleGrid } from '@chakra-ui/react'
import Form from 'components/request/form'
import { useRouter } from 'next/router'
import React from 'react'
import { BathroomType, Place, PlaceType, User, UserRole } from 'utils/model'
import { withSessionSsr } from 'utils/session'
import Layout from '../../../components/layout'
import Summary from '../../../components/place/summary'

type Props = {
  user: User
  place: Place
}

const RequestPage = (props: Props) => {
  const router = useRouter()
  return (
    <Layout user={props.user}>
      <Container maxW="7xl">
        <Box mb="5">
          <Button variant="ghost" leftIcon={<ArrowBackIcon />} onClick={router.back}>
            {props.place.title}
          </Button>
        </Box>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
          <Box>
            <Summary place={props.place} />
          </Box>
          <Form place={props.place} />
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user === undefined) {
    // Redirect user to login
    return {
      redirect: {
        destination: `/login?place=${context.query.id}`,
        permanent: false,
      },
    }
  }
  if (context.req.session.user?.role !== UserRole.Guest) {
    // Allow only guests to request a stay
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      user: context.req.session.user,
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

export default RequestPage
