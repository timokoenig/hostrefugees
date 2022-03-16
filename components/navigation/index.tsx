import { Box, Button, Center, Flex, Heading, HStack, Link } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { User } from 'utils/model'
import Menu from './menu'

type Props = {
  user?: User
}

export default function Navigation(props: Props) {
  const router = useRouter()

  return (
    <Box px={4}>
      <Center>
        <Flex maxW="7xl" px="4" flex="1" h={16} justifyContent="space-between">
          <HStack spacing={8} alignItems="center">
            <Heading size="md" fontWeight="extrabold" color="blue.500">
              <Link href="/">HostRefugees.eu</Link>
            </Heading>
          </HStack>
          {props.user ? (
            <Flex alignItems="center">
              <Menu />
            </Flex>
          ) : (
            <Flex alignItems="center">
              <Button
                variant="solid"
                colorScheme="blue"
                size="sm"
                mr={4}
                onClick={() => router.push('/become-host')}
              >
                Become a Host
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push('/login')}>
                Login
              </Button>
            </Flex>
          )}
        </Flex>
      </Center>
    </Box>
  )
}
