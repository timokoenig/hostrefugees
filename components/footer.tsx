import {
  Box,
  Container,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import Github from './common/github'
import Kofi from './common/kofi'

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
      mt="20"
    >
      <Container as={Stack} maxW="7xl" py={10}>
        <SimpleGrid templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' }} spacing={8}>
          <Stack spacing={6}>
            <Box>
              <Heading size="md" fontWeight="extrabold" color="blue.500">
                <Link href="/">HostRefugees.eu</Link>
              </Heading>
            </Box>
            <Text fontSize="sm">© 2022 Timo Koenig. All rights reserved</Text>
            <HStack spacing={5}>
              <Github />
              <Kofi />
            </HStack>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Guest</ListHeader>
            <Link href="/welcome">Welcome To Germany</Link>
            <Link href="/place">Available Places</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Host</ListHeader>
            <Link href="/become-host">Become a Host</Link>
            <Link href="/documents">Documents</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Support</ListHeader>
            <Link href="/help">Help Center</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/imprint">Legal</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
