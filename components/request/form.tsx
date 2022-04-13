import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Switch,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { HostType } from '@prisma/client'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MappedPlace } from 'utils/models'
import * as Yup from 'yup'
import CustomButton from '../common/button'
import NumberInput from '../place/number-input'

const validationSchema = Yup.object().shape({
  adults: Yup.number().required('Required'),
  children: Yup.number().required('Required'),
  about: Yup.string().required('Required'),
  phoneNumber: Yup.string().required('Required'),
})

type Props = {
  place: MappedPlace
}

const Form = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      adults: 1,
      children: 0,
      pets: false,
      about: '',
      phoneNumber: '',
    },
    validationSchema,
    onSubmit: async values => {
      try {
        const res = await fetch('/api/request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            request: {
              ...values,
              placeId: props.place.id,
              startDate: new Date(),
              endDate: new Date(),
            },
          }),
        })
        if (res.ok) {
          await router.push(`/place/${props.place.id}/confirmation`)
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
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <Box mb="10">
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color={useColorModeValue('blue.500', 'blue.300')}
            fontWeight="500"
            textTransform="uppercase"
            mb="4"
          >
            {t('request.new')}
          </Text>

          {props.place.hostType == HostType.PEOPLE && (
            <>
              <Heading size="sm" mb="2">
                {t('request.new.guests')}
              </Heading>
              <Box py="2" width="100%">
                <Flex>
                  <Text flex="1" fontSize="lg" pt="1">
                    {t('adults')}{' '}
                    <Text as="span" fontSize="xs" fontWeight="bold">
                      ({t('max')} {props.place.adults})
                    </Text>
                  </Text>
                  <Box>
                    <FormControl
                      isRequired
                      isDisabled={formik.isSubmitting}
                      isInvalid={formik.errors.adults !== undefined && formik.touched.adults}
                    >
                      <NumberInput
                        active={true}
                        value={formik.values.adults}
                        min={1}
                        max={props.place.adults}
                        onChange={newVal => formik.setFieldValue('adults', newVal)}
                      />
                      <FormErrorMessage>{formik.errors.adults}</FormErrorMessage>
                    </FormControl>
                  </Box>
                </Flex>
              </Box>
              <Box py="2">
                <Flex>
                  <Text flex="1" fontSize="lg" pt="1">
                    {t('children')}{' '}
                    <Text as="span" fontSize="xs" fontWeight="bold">
                      ({t('max')} {props.place.children})
                    </Text>
                  </Text>
                  <Box>
                    <FormControl
                      isRequired
                      isDisabled={formik.isSubmitting}
                      isInvalid={formik.errors.children !== undefined && formik.touched.children}
                    >
                      <NumberInput
                        active={true}
                        value={formik.values.children}
                        max={props.place.children}
                        onChange={newVal => formik.setFieldValue('children', newVal)}
                      />
                      <FormErrorMessage>{formik.errors.children}</FormErrorMessage>
                    </FormControl>
                  </Box>
                </Flex>
              </Box>
              <Box py="2">
                <Flex>
                  <Text flex="1" fontSize="lg" pt="1">
                    {t('request.new.pets')}
                  </Text>
                  <Box pt="1">
                    <FormControl isDisabled={formik.isSubmitting}>
                      <Switch
                        id="pets"
                        size="lg"
                        isChecked={formik.values.pets}
                        onChange={() => formik.setFieldValue('pets', !formik.values.pets)}
                      />
                    </FormControl>
                  </Box>
                </Flex>
              </Box>
            </>
          )}
        </Box>

        <Box mb="10">
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color={useColorModeValue('blue.500', 'blue.300')}
            fontWeight="500"
            textTransform="uppercase"
            mb="4"
          >
            {t('request.new.about')}
          </Text>
          <FormControl
            isRequired
            isDisabled={formik.isSubmitting}
            isInvalid={formik.errors.about !== undefined && formik.touched.about}
          >
            <Textarea
              id="about"
              placeholder={t('request.new.about.placeholder')}
              value={formik.values.about}
              onChange={formik.handleChange}
            />
            <FormErrorMessage>{formik.errors.about}</FormErrorMessage>
          </FormControl>
        </Box>

        <Box mb="10">
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color={useColorModeValue('blue.500', 'blue.300')}
            fontWeight="500"
            textTransform="uppercase"
          >
            {t('request.new.contact')}
          </Text>
          <Text color={useColorModeValue('gray.600', 'gray.400')} mb="4">
            {t('request.new.contact.info')}
          </Text>
          <Text fontSize="lg">{t('phone')}</Text>
          <FormControl
            isRequired
            isDisabled={formik.isSubmitting}
            isInvalid={formik.errors.phoneNumber !== undefined && formik.touched.phoneNumber}
          >
            <Input
              id="phoneNumber"
              type="text"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
            <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
          </FormControl>
        </Box>

        <CustomButton title={t('request.new.confirm')} fullWidth isDisabled={formik.isSubmitting} />
      </Box>
    </form>
  )
}

export default Form
