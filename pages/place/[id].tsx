import { Box, Container, Text } from '@chakra-ui/react'
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

const PlaceDetailPage = (props: Props) => {
  return (
    <Layout>
      <Navigation user={props.user} />
      <Container maxW="7xl">
        <Box align="center">
          <Text>Place Detail</Text>
        </Box>
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

export default PlaceDetailPage