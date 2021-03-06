import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import Button from './common/button'

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').trim().required('Required'),
  password: Yup.string().trim().required('Required'),
})

const Login = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async values => {
      if (!formik.isValid) return
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
        if (res.ok) {
          let path = '/dashboard'
          if (router.query.place !== undefined) {
            path = `/place/${router.query.place}/request`
          } else if (router.query.page !== undefined) {
            path = `/${router.query.page}`
          }
          await router.push(path)
        } else {
          toast({
            title: 'Login failed',
            description: 'Please try again',
            status: 'error',
            duration: 2000,
            isClosable: true,
          })
        }
      } catch {
        toast({
          title: 'Login failed',
          description: 'Please try again',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
    },
  })

  return (
    <Flex align="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">{t('signin.title')}</Heading>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl
                isRequired
                isDisabled={formik.isSubmitting}
                isInvalid={formik.errors.email !== undefined && formik.touched.email}
              >
                <FormLabel htmlFor="email">{t('email')}</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isDisabled={formik.isSubmitting}
                isInvalid={formik.errors.password !== undefined && formik.touched.password}
              >
                <FormLabel htmlFor="password">{t('password')}</FormLabel>
                <Input
                  id="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Box>
                <Link color="blue.400" href="/forgot-password">
                  {t('signin.forgotpassword')}
                </Link>
              </Box>
              <Stack spacing={10}>
                <Button title={t('signin')} fullWidth isDisabled={formik.isSubmitting} />
              </Stack>
            </Stack>
          </form>
        </Box>
        <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')} textAlign="center">
          {t('signin.newaccount')}{' '}
          <Link color="blue.400" href="/register">
            {t('signin.register')}
          </Link>
        </Text>
      </Stack>
    </Flex>
  )
}

export default Login
