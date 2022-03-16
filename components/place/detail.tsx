import {
  Box,
  Container,
  GridItem,
  Heading,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { formatAvailability, formatPlaceType } from 'utils/formatter'
import { MappedPlace } from 'utils/models'
import Button from '../common/button'

type Props = {
  place: MappedPlace
  enableRequest: boolean
}

const PlaceholderImage = () => (
  <Image
    rounded="md"
    alt="product image"
    src="https://picsum.photos/900/600"
    fit="cover"
    align="center"
    w="100%"
    h={{ base: '100%', sm: '400px', lg: '500px' }}
  />
)

export default function Detail(props: Props) {
  const { t } = useTranslation('common')
  const router = useRouter()
  return (
    <Container maxW="7xl">
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }}>
        <SimpleGrid columns={2} spacing="5">
          <GridItem colSpan={2}>
            <PlaceholderImage />
          </GridItem>
          <GridItem>
            <PlaceholderImage />
          </GridItem>
          <GridItem>
            <PlaceholderImage />
          </GridItem>
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
                  {props.place.author.languages.map(lang => t(`lang.${lang}`)).join(', ')}
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
                House Rules
              </Text>
              <Text fontSize="lg">{props.place.houseRules}</Text>
            </Box>
          </Stack>

          {props.enableRequest && (
            <Button
              fullWidth
              title="Request to stay"
              onClick={() => router.push(`/place/${props.place.id}/request`)}
            />
          )}
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
