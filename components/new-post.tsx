import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import CustomButton from './common/button'

const validationSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short').max(50, 'Too Long').required('Required'),
  description: Yup.string().min(2, 'Too Short').max(5000, 'Too Long').required('Required'),
  addressStreet: Yup.string().min(2, 'Too Short').max(100, 'Too Long').required('Required'),
  addressHouseNumber: Yup.string().min(1, 'Too Short').max(100, 'Too Long').required('Required'),
  addressZip: Yup.string().min(5, 'Too Short').max(5, 'Too Long').required('Required'),
  addressCity: Yup.string().min(2, 'Too Short').max(100, 'Too Long').required('Required'),
})

const NewPost = () => {
  const { t } = useTranslation('common')
  const toast = useToast()
  const router = useRouter()
  const [success, setSuccess] = useState<boolean>(false)
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      addressStreet: '',
      addressHouseNumber: '',
      addressZip: '',
      addressCity: '',
    },
    validationSchema,
    onSubmit: async values => {
      if (!formik.isValid) return
      try {
        const res = await fetch('/api/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
        if (res.ok) {
          setSuccess(true)
        } else {
          toast({
            title: 'Request failed',
            description: 'Please try again',
            status: 'error',
            duration: 2000,
            isClosable: true,
          })
        }
      } catch {
        toast({
          title: 'Request failed',
          description: 'Please try again',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
    },
  })

  return (
    <Container maxW="7xl">
      <Center mb="10">
        <Heading fontSize="4xl">{t('post.new')}</Heading>
      </Center>
      <SimpleGrid templateColumns={{ md: '1fr', lg: '1fr 1fr' }} spacing="10">
        <Stack align="center" spacing="20">
          <HStack maxWidth="xl" spacing="10">
            <Image src="/svg/undraw_taking_notes_re_bnaf.svg" maxHeight="100" />
            <VStack alignItems="right" flex="1">
              <Heading as="h4" size="md" textAlign="right" flex="1">
                {t('post.new.1')}
              </Heading>
              <Text color={useColorModeValue('gray.600', 'gray.400')} textAlign="right">
                {t('post.new.1.info')}
              </Text>
            </VStack>
          </HStack>

          <HStack maxWidth="xl" spacing="10">
            <VStack alignItems="left" flex="1">
              <Heading as="h4" size="md" textAlign="left" flex="1">
                {t('post.new.2')}
              </Heading>
              <Text color={useColorModeValue('gray.600', 'gray.400')}>{t('post.new.2.info')}</Text>
            </VStack>
            <Image src="/svg/undraw_exams_g-4-ow.svg" maxHeight="100" />
          </HStack>

          <HStack maxWidth="xl" spacing="10">
            <Image src="/svg/undraw_basketball_agx4.svg" maxHeight="100" />
            <VStack alignItems="right" flex="1">
              <Heading as="h4" size="md" textAlign="right" flex="1">
                {t('post.new.3')}
              </Heading>
              <Text color={useColorModeValue('gray.600', 'gray.400')} textAlign="right">
                {t('post.new.3.info')}
              </Text>
            </VStack>
          </HStack>
        </Stack>

        <VStack>
          <Box
            minWidth="sm"
            maxWidth="xl"
            rounded="lg"
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow="lg"
            p={8}
          >
            {success ? (
              <>
                <Heading mb="5">{t('thankyou')}!</Heading>
                <Text mb="5">{t('post.new.success')}</Text>
                <Button onClick={() => router.reload()}>{t('post.new.success.button')}</Button>
              </>
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <Stack spacing={4}>
                  <FormControl
                    isRequired
                    isDisabled={formik.isSubmitting}
                    isInvalid={formik.errors.title !== undefined && formik.touched.title}
                  >
                    <FormLabel htmlFor="title">{t('title')}</FormLabel>
                    <Input
                      id="title"
                      type="text"
                      placeholder={t('post.new.title.placeholder')}
                      value={formik.values.title}
                      onChange={formik.handleChange}
                    />
                    <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isRequired
                    isDisabled={formik.isSubmitting}
                    isInvalid={
                      formik.errors.description !== undefined && formik.touched.description
                    }
                  >
                    <FormLabel htmlFor="description">{t('description')}</FormLabel>
                    <Textarea
                      id="description"
                      placeholder={t('post.new.description.placeholder')}
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                    <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
                  </FormControl>

                  <SimpleGrid templateColumns={{ base: '1fr', md: '2fr 1fr' }} spacing={5}>
                    <FormControl
                      isRequired
                      isDisabled={formik.isSubmitting}
                      isInvalid={
                        formik.errors.addressStreet !== undefined && formik.touched.addressStreet
                      }
                    >
                      <FormLabel htmlFor="addressStreet">{t('street')}</FormLabel>
                      <Input
                        id="addressStreet"
                        type="text"
                        value={formik.values.addressStreet}
                        onChange={formik.handleChange}
                      />
                      <FormErrorMessage>{formik.errors.addressStreet}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isRequired
                      isDisabled={formik.isSubmitting}
                      isInvalid={
                        formik.errors.addressHouseNumber !== undefined &&
                        formik.touched.addressHouseNumber
                      }
                    >
                      <FormLabel htmlFor="addressHouseNumber">{t('housenumber')}</FormLabel>
                      <Input
                        id="addressHouseNumber"
                        type="text"
                        value={formik.values.addressHouseNumber}
                        onChange={formik.handleChange}
                      />
                      <FormErrorMessage>{formik.errors.addressHouseNumber}</FormErrorMessage>
                    </FormControl>
                  </SimpleGrid>

                  <SimpleGrid templateColumns={{ base: '1fr', md: '1fr 2fr' }} spacing={5}>
                    <FormControl
                      isRequired
                      isDisabled={formik.isSubmitting}
                      isInvalid={
                        formik.errors.addressZip !== undefined && formik.touched.addressZip
                      }
                    >
                      <FormLabel htmlFor="addressZip">{t('zipcode')}</FormLabel>
                      <Input
                        id="addressZip"
                        type="text"
                        value={formik.values.addressZip}
                        onChange={formik.handleChange}
                      />
                      <FormErrorMessage>{formik.errors.addressZip}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isRequired
                      isDisabled={formik.isSubmitting}
                      isInvalid={
                        formik.errors.addressCity !== undefined && formik.touched.addressCity
                      }
                    >
                      <FormLabel htmlFor="addressCity">{t('city')}</FormLabel>
                      <Input
                        id="addressCity"
                        type="text"
                        value={formik.values.addressCity}
                        onChange={formik.handleChange}
                      />
                      <FormErrorMessage>{formik.errors.addressCity}</FormErrorMessage>
                    </FormControl>
                  </SimpleGrid>

                  <CustomButton title={t('submit')} fullWidth isDisabled={formik.isSubmitting} />
                </Stack>
              </form>
            )}
          </Box>
        </VStack>
      </SimpleGrid>
    </Container>
  )
}

export default NewPost
