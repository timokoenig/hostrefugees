import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'

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

export default function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

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
            {/* <Menu>
              <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                <Avatar
                  size="sm"
                  src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu> */}
          </Flex>
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
