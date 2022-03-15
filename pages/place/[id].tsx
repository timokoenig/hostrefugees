import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Center } from '@chakra-ui/react'
import Detail from 'components/place/detail'
import { useRouter } from 'next/router'
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
          <Detail />
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
    },
  }
})

export default PlaceDetailPage
