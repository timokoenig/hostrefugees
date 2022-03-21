import { Center, Container, Heading } from '@chakra-ui/react'
import Item from 'components/help/item'
import React from 'react'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Layout from '../components/layout'

type Props = {
  user?: MappedUser
}

const DocumentsPage = (props: Props) => {
  return (
    <Layout user={props.user}>
      <Container maxW="7xl">
        <Center>
          <Heading as="h1" size="xl">
            Documents
          </Heading>
        </Center>
        <Item
          title="Flyer Template"
          text="We provide a free flyer template in busines card format. You can download the PDF file, bring it to a copy shop, and share it with the refugees. It inlcudes the url to our welcome page and the most important phone numbers (police and ambulance)"
        />
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

export default DocumentsPage
