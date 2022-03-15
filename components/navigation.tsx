import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { User } from 'utils/model'

const Links: string[] = []

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded="md"
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href="#"
  >
    {children}
  </Link>
)

type Props = {
  user?: User
}

export default function Navigation(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  const onLogout = async () => {
    try {
      await fetch('/api/logout')
      await router.replace('/')
    } catch (err: unknown) {
      console.log(err)
    }
  }

  return (
    <Box px={4}>
      <Center>
        <Flex maxW="7xl" flex="1" h={16} justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems="center">
            <Heading size="md" fontWeight="extrabold" color="blue.500">
              <Link href="/">HostRefugees.eu</Link>
            </Heading>
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map(link => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          {props.user ? (
            <Flex alignItems="center">
              <Menu>
                <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                  <Avatar
                    size="sm"
                    src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => router.push('/dashboard')}>Dashboard</MenuItem>
                  <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
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
              <Button
                variant="ghost"
                // colorScheme="blue"
                size="sm"
                mr={4}
                onClick={() => router.push('/login')}
              >
                Login
              </Button>
            </Flex>
          )}
        </Flex>
      </Center>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {Links.map(link => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}
