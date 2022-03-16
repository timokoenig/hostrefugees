import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { BathroomType, Place, PlaceType, User, UserRole } from 'utils/model'
import { withSessionSsr } from 'utils/session'
import Footer from '../../../components/footer'
import Layout from '../../../components/layout'
import Navigation from '../../../components/navigation'
import NumberInput from '../../../components/place/number-input'
import Summary from '../../../components/place/summary'
import Spacer from '../../../components/spacer'

type Props = {
  user: User
  place: Place
}

const RequestPage = (props: Props) => {
  const router = useRouter()
  const [adults, setAdults] = useState<number>(1)
  const [children, setChildren] = useState<number>(0)
  return (
    <Layout>
      <Navigation user={props.user} />
      <Container maxW="7xl">
        <Box mb="5">
          <Button variant="ghost" leftIcon={<ArrowBackIcon />} onClick={router.back}>
            Place Title
          </Button>
        </Box>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
          <Box>
            <Summary place={props.place} />
          </Box>
          <Box>
            <Box mb="5">
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('blue.500', 'blue.300')}
                fontWeight="500"
                textTransform="uppercase"
                mb="4"
              >
                Request to stay
              </Text>

              <Heading size="sm" mb="2">
                How many people want to stay at this place?
              </Heading>
              <Box py="2">
                <Flex>
                  <Text flex="1" fontSize="lg">
                    Adults (max {props.place.adults})
                  </Text>
                  <NumberInput
                    active={true}
                    value={adults}
                    min={1}
                    max={props.place.adults}
                    onChange={setAdults}
                  />
                </Flex>
              </Box>
              <Box>
                <Flex>
                  <Text flex="1" fontSize="lg">
                    Children (max {props.place.children})
                  </Text>
                  <NumberInput
                    active={true}
                    value={children}
                    max={props.place.children}
                    onChange={setChildren}
                  />
                </Flex>
              </Box>
            </Box>

            <Box mb="5">
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('blue.500', 'blue.300')}
                fontWeight="500"
                textTransform="uppercase"
                mb="4"
              >
                Tell the host about yourself
              </Text>
              <Textarea placeholder="Here is a sample placeholder" />
            </Box>

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
          </Box>
        </SimpleGrid>
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
        destination: `/login?place=${context.query.id}`,
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