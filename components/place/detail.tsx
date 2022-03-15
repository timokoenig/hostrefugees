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
import { useRouter } from 'next/router'
import React from 'react'

export default function Detail() {
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
              1 Bedroom
            </Heading>
            <Text color={useColorModeValue('gray.900', 'gray.400')} fontWeight={300} fontSize="2xl">
              Available from{' '}
              <Text as="span" fontWeight="semibold">
                20.03.2022
              </Text>{' '}
              to{' '}
              <Text as="span" fontWeight="semibold">
                12.04.2022
              </Text>
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction="column"
            divider={<StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />}
          >
            <Text fontSize="lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet at delectus
              doloribus dolorum expedita hic, ipsum maxime modi nam officiis porro, quae, quisquam
              quos reprehenderit velit? Natus, totam.
            </Text>
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
                  Private Room
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Rooms:
                  </Text>{' '}
                  1
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Beds:
                  </Text>{' '}
                  1
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Bathroom:
                  </Text>{' '}
                  Shared
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Adults:
                  </Text>{' '}
                  1
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Children:
                  </Text>{' '}
                  0
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Address:
                  </Text>{' '}
                  Hamburg (exact location will be shared when stay gets accepted)
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Host Language:
                  </Text>{' '}
                  English, German
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
              <Text fontSize="lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet at
                delectus doloribus dolorum expedita hic, ipsum maxime modi nam officiis porro, quae,
                quisquam quos reprehenderit velit? Natus, totam.
              </Text>
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
            onClick={() => router.push('/place/1/request')}
          >
            Request to stay
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
