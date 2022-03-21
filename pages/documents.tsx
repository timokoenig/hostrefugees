import {
  Box,
  Button,
  Center,
  Container,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
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
        <Center mb="10">
          <Heading as="h1" size="xl">
            Documents
          </Heading>
        </Center>
        <Center textAlign="center">
          <Box mb="5" maxWidth="2xl">
            <Heading as="h2" size="md" mb="2">
              Flyer Template
            </Heading>
            <Text mb="5" color={useColorModeValue('gray.600', 'gray.400')}>
              We provide a free flyer template in busines card size. You can download the PDF file,
              bring it to a copy shop, and share it with the refugees. It inlcudes the url to our
              welcome page and the most important phone numbers (police and ambulance)
            </Text>
            <SimpleGrid columns={2} spacing={5}>
              <GridItem backgroundColor="gray.500" height="100" rounded="xl" />
              <GridItem backgroundColor="gray.500" height="100" rounded="xl" />
            </SimpleGrid>
            <Button my="5" onClick={() => {}}>
              Download PDF
            </Button>
          </Box>
        </Center>
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
