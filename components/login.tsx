import {
  Box,
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
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import Button from './common/button'

const Login = () => {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async values => {
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
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
    },
  })

  return (
    <Flex align="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign in to your account</Heading>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button title="Sign in" fullWidth />
              </Stack>
            </Stack>
          </form>
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
