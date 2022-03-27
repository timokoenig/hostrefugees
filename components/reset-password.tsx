import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import Button from './common/button'

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'At least 6 characters').max(50, 'Too Long').required('Required'),
})

const ResetPassword = () => {
  const { t } = useTranslation('common')
  const toast = useToast()
  const router = useRouter()
  const [validReset, setValidReset] = useState<boolean>(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async values => {
      if (!formik.isValid) return
      try {
        const res = await fetch(`/api/user/reset/${router.query.hash}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
        if (res.ok) {
          setValidReset(true)
        } else {
          toast({
            title: 'Password Reset failed',
            description: 'Please try again',
            status: 'error',
            duration: 2000,
            isClosable: true,
          })
        }
      } catch {
        toast({
          title: 'Password Reset failed',
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
          <Heading fontSize="4xl">{t('resetpassword')}</Heading>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          {validReset ? (
            <Stack align="center" spacing={5}>
              <Text>{t('resetpassword.success')}</Text>
              <Button
                title={t('resetpassword.success.button')}
                fullWidth
                isDisabled={formik.isSubmitting}
                onClick={() => router.push('/login')}
              />
            </Stack>
          ) : (
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
                <Stack spacing={10}>
                  <Button
                    title={t('resetpassword.button')}
                    fullWidth
                    isDisabled={formik.isSubmitting}
                  />
                </Stack>
              </Stack>
            </form>
          )}
        </Box>
      </Stack>
    </Flex>
  )
}

export default ResetPassword
