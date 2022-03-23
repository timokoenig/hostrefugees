import { Container, Heading, Link } from '@chakra-ui/react'
import Item from 'components/help/item'
import React from 'react'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Layout from '../components/layout'

type Props = {
  user?: MappedUser
}

const HelpPage = (props: Props) => {
  return (
    <Layout user={props.user}>
      <Container maxW="7xl">
        <Heading as="h1" size="lg" mb="5">
          Help Center
        </Heading>
        <Item title="How can I apply for a stay?">
          First look for a{' '}
          <Link href="/place" fontWeight="semibold">
            place to stay
          </Link>
          . If you found a place that meets your requirements, simply click on the "Request to
          stay"-button, fill out the required fields, tell the host a bit about yourself, and
          confirm the requset. You will receive an email as soon as the host accepts the request. In
          that email you will the contact information and arrival instructions. We kindly ask you to
          contact the host to communicate the arrival.
        </Item>
        <Item title="How can I offer a place to stay?">
          To host on HostRefugees you must have an apartment, room, or other place that is located
          in Germany. The place needs to be in good condition and has at least one bed and bathroom.
          If you fulfill these requirements you can go to{' '}
          <Link href="/become-host" fontWeight="semibold">
            Become a Host
          </Link>{' '}
          and register. After registration you will need to upload your ID or passport to identify
          yourself. This is mandatory to keep our guests safe.
        </Item>
      </Container>
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
