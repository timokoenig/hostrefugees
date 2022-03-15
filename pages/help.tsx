import { Container, Heading } from '@chakra-ui/react'
import Item from 'components/help/item'
import React from 'react'
import { User } from 'utils/model'
import { withSessionSsr } from 'utils/session'
import Footer from '../components/footer'
import Layout from '../components/layout'
import Navigation from '../components/navigation'
import Spacer from '../components/spacer'

type Props = {
  user?: User
}

const HelpPage = (props: Props) => {
  return (
    <Layout>
      <Navigation user={props.user} />
      <Container maxW="7xl">
        <Heading as="h1" size="lg" mb="5">
          Help Center
        </Heading>
        <Item
          title="How can I apply for a place?"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
        <Item
          title="How can I apply for a place?"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
        <Item
          title="How can I apply for a place?"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
        <Item
          title="How can I apply for a place?"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
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

export default HelpPage
