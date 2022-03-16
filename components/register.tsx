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
import { useFormik } from 'formik'
import React, { useState } from 'react'
import Button from './common/button'

const Register = () => {
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
    },
    onSubmit: values => {
      console.log(values)
    },
  })
  return (
    <Flex align="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign up</Heading>
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
                <Button title="Sign up" fullWidth isDisabled={!termsAccepted} />
              </Stack>
            </Stack>
          </form>
        </Box>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          Already have an account?{' '}
          <Link color="blue.400" href="/login">
            Login
          </Link>
        </Text>
      </Stack>
    </Flex>
  )
}

export default Register
