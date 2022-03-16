import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Container, GridItem, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import Layout from 'components/layout'
import Spacer from 'components/spacer'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { User, UserRole } from 'utils/model'
import { withSessionSsr } from 'utils/session'
import Form from '../../../components/dashboard/place/form'
import Footer from '../../../components/footer'
import Navigation from '../../../components/navigation'

type Props = {
  user: User
}

const NewPage = (props: Props) => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Layout>
        <Navigation user={props.user} />
        <Container maxW="7xl">
          <Box mb="5">
            <Button variant="ghost" leftIcon={<ArrowBackIcon />} onClick={router.back}>
              Dashboard
            </Button>
          </Box>
          <Heading as="h2" size="lg" mb="10">
            Create New Place
          </Heading>
          <SimpleGrid columns={3} spacing={5}>
            <GridItem colSpan={2}>
              <Form />
            </GridItem>
            <Box>
              <Text>Info</Text>
            </Box>
          </SimpleGrid>
        </Container>
        <Spacer />
        <Footer />
      </Layout>
    </>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user === undefined || context.req.session.user?.role === UserRole.Guest) {
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
    },
  }
})

export default NewPage
