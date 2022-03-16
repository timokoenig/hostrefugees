import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  console.log()

  const onLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      if (res.ok) {
        if (router.query.place === undefined) {
          await router.replace('/dashboard')
        } else {
          await router.replace(`/place/${router.query.place}/request`)
        }
      }
    } catch (err: unknown) {
      console.log(err)
    }
  }

  return (
    <Flex align="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign in to your account</Heading>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={onLogin}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          Don&apos;t have an account?{' '}
          <Link color="blue.400" href="/register">
            Register now
          </Link>
        </Text>
      </Stack>
    </Flex>
  )
}

export default Login
