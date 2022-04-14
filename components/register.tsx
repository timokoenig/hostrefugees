import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { UserRole } from '@prisma/client'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import Button from './common/button'

const validationSchema = Yup.object().shape({
  firstname: Yup.string().min(2, 'Too Short').max(50, 'Too Long').trim().required('Required'),
  lastname: Yup.string().min(2, 'Too Short').max(50, 'Too Long').trim().required('Required'),
  email: Yup.string().email('Invalid email').trim().required('Required'),
  password: Yup.string()
    .min(6, 'At least 6 characters')
    .max(50, 'Too Long')
    .trim()
    .required('Required'),
})

const Register = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const toast = useToast()
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
    },
    validationSchema,
    onSubmit: async values => {
      if (!formik.isValid) return
      try {
        const res = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...values,
            role: UserRole.GUEST,
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
          await router.push('/onboarding')
        } else {
          toast({
            title: 'Registration failed',
            description: 'Please try again',
            status: 'error',
            duration: 2000,
            isClosable: true,
          })
        }
      } catch {
        toast({
          title: 'Registration failed',
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
          <Heading fontSize="4xl">{t('signup')}</Heading>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl
                    isRequired
                    isDisabled={formik.isSubmitting}
                    isInvalid={formik.errors.firstname !== undefined && formik.touched.firstname}
                  >
                    <FormLabel htmlFor="firstname">{t('firstname')}</FormLabel>
                    <Input
                      id="firstname"
                      type="text"
                      value={formik.values.firstname}
                      onChange={formik.handleChange}
                    />
                    <FormErrorMessage>{formik.errors.firstname}</FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl
                    isRequired
                    isDisabled={formik.isSubmitting}
                    isInvalid={formik.errors.lastname !== undefined && formik.touched.lastname}
                  >
                    <FormLabel htmlFor="lastname">{t('lastname')}</FormLabel>
                    <Input
                      id="lastname"
                      type="text"
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                    />
                    <FormErrorMessage>{formik.errors.lastname}</FormErrorMessage>
                  </FormControl>
                </Box>
              </HStack>
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
              <Stack spacing={10}>
                <Checkbox
                  onChange={() => setTermsAccepted(!termsAccepted)}
                  value={termsAccepted ? 1 : 0}
                >
                  <Trans i18nKey="signup.accept" t={t}>
                    a
                    <Link href="/privacy" target="_blank" color="blue.400">
                      1
                    </Link>
                  </Trans>
                </Checkbox>
                <Button
                  title={t('signup')}
                  fullWidth
                  isDisabled={!termsAccepted || formik.isSubmitting}
                />
              </Stack>
            </Stack>
          </form>
        </Box>
        <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')} textAlign="center">
          {t('signup.existingaccount')}{' '}
          <Link color="blue.400" href="/login">
            {t('login')}
          </Link>
        </Text>
      </Stack>
    </Flex>
  )
}

export default Register
