import {
  Box,
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
import { UserRole } from '@prisma/client'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Button from './common/button'

const Register = () => {
  const router = useRouter()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
    },
    onSubmit: async values => {
      setLoading(true)
      try {
        const res = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...values,
            role: UserRole.HOST,
          }),
        })
        if (res.ok) {
          // registration successful, now log in
          await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          })
          await router.replace('/onboarding')
        }
      } catch (err: unknown) {
        console.log(err)
      }
      setLoading(false)
    },
  })
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
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl isRequired>
                    <FormLabel htmlFor="firstname">First Name</FormLabel>
                    <Input
                      id="firstname"
                      type="text"
                      value={formik.values.firstname}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel htmlFor="lastname">Last Name</FormLabel>
                    <Input
                      id="lastname"
                      type="text"
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                </Box>
              </HStack>
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
                <Button title="Sign up" fullWidth isDisabled={!termsAccepted || isLoading} />
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Register
