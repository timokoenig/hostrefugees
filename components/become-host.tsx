import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useState } from 'react'

const Register = () => {
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false)
  return (
    <Flex align="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Become a Host</Heading>
          <Text fontSize="lg" textAlign="center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet at delectus
            doloribus dolorum expedita hic, ipsum maxime modi nam officiis porro, quae, quisquam
            quos reprehenderit velit? Natus, totam.
          </Text>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Checkbox
                onChange={() => setTermsAccepted(!termsAccepted)}
                value={termsAccepted ? 1 : 0}
              >
                I accept the{' '}
                <Link href="/terms" target="_blank" color="blue.400">
                  Terms
                </Link>{' '}
                and{' '}
                <Link href="/privacy" target="_blank" color="blue.400">
                  Data Privacy
                </Link>
              </Checkbox>
              <Button
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500',
                }}
                isDisabled={!termsAccepted}
              >
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Register
