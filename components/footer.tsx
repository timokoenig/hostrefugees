import {
  Box,
  Container,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight="500" fontSize="lg" mb={2}>
      {children}
    </Text>
  )
}

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} maxW="6xl" py={10}>
        <SimpleGrid templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' }} spacing={8}>
          <Stack spacing={6}>
            <Box>
              <Heading size="md" fontWeight="extrabold">
                HostRefugee.eu
              </Heading>
            </Box>
            <Text fontSize="sm">© 2022 Timo Koenig. All rights reserved</Text>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Be a Guest</ListHeader>
            <Link href="#">Info1</Link>
            <Link href="#">Info2</Link>
            <Link href="#">Info3</Link>
            <Link href="#">Info4</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Be a Host</ListHeader>
            <Link href="#">Info1</Link>
            <Link href="#">Info2</Link>
            <Link href="#">Info3</Link>
            <Link href="#">Info4</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Support</ListHeader>
            <Link href="#">Help Center</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Legal</Link>
            <Link href="#">Privacy Policy</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
