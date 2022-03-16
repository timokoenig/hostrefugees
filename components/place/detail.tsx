import {
  Box,
  Button,
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
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import { Place } from 'utils/model'

type Props = {
  place: Place
}

export default function Detail(props: Props) {
  const router = useRouter()
  return (
    <Container maxW="7xl">
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }}>
        <SimpleGrid columns={2} spacing="5">
          <GridItem colSpan={2}>
            <Image
              rounded="md"
              alt="product image"
              src="https://picsum.photos/900/600"
              fit="cover"
              align="center"
              w="100%"
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </GridItem>
          <GridItem>
            <Image
              rounded="md"
              alt="product image"
              src="https://picsum.photos/900/600"
              fit="cover"
              align="center"
              w="100%"
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </GridItem>
          <GridItem>
            <Image
              rounded="md"
              alt="product image"
              src="https://picsum.photos/900/600"
              fit="cover"
              align="center"
              w="100%"
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
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
              Available from{' '}
              <Text as="span" fontWeight="semibold">
                {moment(props.place.availabilityStart).format('DD.MM.YYYY')}
              </Text>{' '}
              to{' '}
              <Text as="span" fontWeight="semibold">
                {moment(props.place.availabilityEnd).format('DD.MM.YYYY')}
              </Text>
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
                  {props.place.type}
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
                  {props.place.author.languages.join(', ')}
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
            onClick={() => router.push(`/place/${props.place.id}/request`)}
          >
            Request to stay
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
