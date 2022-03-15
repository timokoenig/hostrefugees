import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Filter from 'components/place/filter'
import Map from 'components/place/map'
import React from 'react'
import { User } from 'utils/model'
import { withSessionSsr } from 'utils/session'
import Footer from '../../components/footer'
import Layout from '../../components/layout'
import Navigation from '../../components/navigation'
import Spacer from '../../components/spacer'

type Props = {
  user?: User
}

const PlacePage = (props: Props) => {
  return (
    <Layout>
      <Navigation user={props.user} />
      <Container maxW="7xl">
        <Heading mb="10">Available Places</Heading>
        <Filter />
        <SimpleGrid columns={2} spacing="10">
          <Box>12 places available</Box>
          <Box>
            <Map />
          </Box>
        </SimpleGrid>
      </Container>
      <Spacer />
      <Footer />
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
