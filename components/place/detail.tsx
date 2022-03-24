import {
  Box,
  Container,
  GridItem,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { Request } from '@prisma/client'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { formatAvailability, formatPlaceType } from 'utils/formatter'
import { MappedPlace } from 'utils/models'
import Button from '../common/button'
import Status from '../dashboard/request/status'

type Props = {
  place: MappedPlace
  request: Request | null
  enableRequest: boolean
}

export default function Detail(props: Props) {
  const { t: tLang } = useTranslation('languages')
  const router = useRouter()
  const titleColor = useColorModeValue('blue.500', 'blue.300')

  const RequestButton = (): JSX.Element | null => {
    if (props.request !== null) {
      return (
        <Status color="yellow.500" title="WAITING">
          <Text mb="2">You already have sent a request to stay to this place</Text>
          <Link fontWeight="semibold" href={`/dashboard/request/${props.request.id}`}>
            Show Request
          </Link>
        </Status>
      )
    }
    if (props.enableRequest) {
      return (
        <Button
          fullWidth
          title="Request to stay"
          onClick={() => router.push(`/place/${props.place.id}/request`)}
        />
      )
    }
    return null
  }

  return (
    <Container maxW="7xl">
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }}>
        <SimpleGrid columns={2} spacing="5">
          {props.place.photos.length == 0 ? (
            <Box rounded="md" backgroundColor="gray" w="100%" h="100%" />
          ) : (
            props.place.photos.map((photo, i) => (
              <GridItem key={i} colSpan={i == 0 ? 2 : 1}>
                <Image
                  rounded="md"
                  alt="product image"
                  src={`/api/place/${props.place.id}/photo/${photo}`}
                  fit="cover"
                  align="center"
                  w="100%"
                  h={{ base: '100%', sm: '400px', lg: '500px' }}
                />
              </GridItem>
            ))
          )}
        </SimpleGrid>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as="header">
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              {props.place.title}
            </Heading>
            <Text color={useColorModeValue('gray.900', 'gray.400')} fontWeight={300} fontSize="2xl">
              {formatAvailability(props.place)}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction="column"
            divider={<StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />}
          >
            <Text fontSize="lg">{props.place.description}</Text>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('blue.500', 'blue.300')}
                fontWeight="500"
                textTransform="uppercase"
                mb="4"
              >
                Residents
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Adults
                  </Text>{' '}
                  {props.place.placeAdults} (
                  {props.place.placeAdultWomen && props.place.placeAdultMen
                    ? 'Women & Men'
                    : props.place.placeAdultMen
                    ? 'Only Men'
                    : 'Only Women'}
                  )
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Children
                  </Text>{' '}
                  {props.place.placeChildren}
                </ListItem>
              </List>
            </Box>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('blue.500', 'blue.300')}
                fontWeight="500"
                textTransform="uppercase"
                mb="4"
              >
                Place Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Type of place
                  </Text>{' '}
                  {formatPlaceType(props.place)}
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Rooms:
                  </Text>{' '}
                  {props.place.rooms}
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Beds:
                  </Text>{' '}
                  {props.place.beds}
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Bathroom:
                  </Text>{' '}
                  {props.place.bathroom}
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Adults:
                  </Text>{' '}
                  {props.place.adults}
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Children:
                  </Text>{' '}
                  {props.place.children}
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Address:
                  </Text>{' '}
                  {props.place.addressCity} (exact location will be shared when the stay gets
                  accepted)
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Host Language:
                  </Text>{' '}
                  {props.place.author.languages.map(lang => tLang(lang)).join(', ')}
                </ListItem>
              </List>
            </Box>
            {props.place.houseRules !== '' && (
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={titleColor}
                  fontWeight="500"
                  textTransform="uppercase"
                  mb="4"
                >
                  House Rules
                </Text>
                <Text fontSize="lg">{props.place.houseRules}</Text>
              </Box>
            )}
          </Stack>

          <RequestButton />
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
