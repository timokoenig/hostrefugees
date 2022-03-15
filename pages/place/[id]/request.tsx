import { Box, Button, Container, Flex, Heading, Text, Textarea } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { User } from 'utils/model'
import { withSessionSsr } from 'utils/session'
import Footer from '../../../components/footer'
import Layout from '../../../components/layout'
import Navigation from '../../../components/navigation'
import NumberInput from '../../../components/place/number-input'
import Spacer from '../../../components/spacer'

type Props = {
  user?: User
}

const RequestPage = (props: Props) => {
  const router = useRouter()
  const [adults, setAdults] = useState<number>(1)
  const [children, setChildren] = useState<number>(0)
  return (
    <Layout>
      <Navigation user={props.user} />
      <Container maxW="7xl" textAlign="center">
        <Heading>Request to stay at</Heading>
        <Heading mb="5">1 Bedroom</Heading>
        <Text>
          Available from{' '}
          <Text as="span" fontWeight="semibold">
            20.03.2022
          </Text>{' '}
          to{' '}
          <Text as="span" fontWeight="semibold">
            12.04.2022
          </Text>
        </Text>
        <Text>
          Located in{' '}
          <Text as="span" fontWeight="semibold">
            Hamburg
          </Text>
        </Text>
        <Container my="10">
          <Heading size="sm">How many people want to stay at this place?</Heading>
          <Box maxWidth="400">
            <Flex py="5">
              <Text flex="1" fontSize="lg">
                Adults
              </Text>
              <NumberInput active={true} value={adults} min={1} onChange={setAdults} />
            </Flex>
          </Box>
          <Box maxWidth="400">
            <Flex py="5">
              <Text flex="1" fontSize="lg">
                Children
              </Text>
              <NumberInput active={true} value={children} onChange={setChildren} />
            </Flex>
          </Box>
        </Container>
        <Container my="10">
          <Heading size="sm">Tell the host about yourself</Heading>
          <Textarea placeholder="Here is a sample placeholder" />
        </Container>
        <Button
          rounded="10"
          w="full"
          mt={8}
          size="lg"
          py="7"
          bg="blue.500"
          color="white"
          textTransform="uppercase"
          _hover={{
            transform: 'translateY(2px)',
            boxShadow: 'lg',
          }}
          onClick={() => router.replace('/place/1/confirmation')}
        >
          Confirm Request
        </Button>
      </Container>
      <Spacer />
      <Footer />
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user === undefined) {
    return {
      redirect: {
        destination: `/login?place=1`,
        permanent: false,
      },
    }
  }
  return {
    props: {
      user: context.req.session.user ?? null,
    },
  }
})

export default RequestPage
