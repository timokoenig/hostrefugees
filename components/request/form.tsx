import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
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
  const router = useRouter()
  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      adults: 1,
      children: 0,
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
        <Box mb="5">
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color={useColorModeValue('blue.500', 'blue.300')}
            fontWeight="500"
            textTransform="uppercase"
            mb="4"
          >
            Request to stay
          </Text>

          <Heading size="sm" mb="2">
            How many people want to stay at this place?
          </Heading>
          <Box py="2">
            <Flex>
              <Text flex="1" fontSize="lg" pt="1">
                Adults{' '}
                <Text as="span" fontSize="xs" fontWeight="bold">
                  (max {props.place.adults})
                </Text>
              </Text>
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
            </Flex>
          </Box>
          <Box>
            <Flex>
              <Text flex="1" fontSize="lg" pt="1">
                Children{' '}
                <Text as="span" fontSize="xs" fontWeight="bold">
                  (max {props.place.children})
                </Text>
              </Text>
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
            </Flex>
          </Box>
        </Box>

        <Box mb="5">
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color={useColorModeValue('blue.500', 'blue.300')}
            fontWeight="500"
            textTransform="uppercase"
            mb="4"
          >
            Tell the host about yourself
          </Text>
          <FormControl
            isRequired
            isDisabled={formik.isSubmitting}
            isInvalid={formik.errors.about !== undefined && formik.touched.about}
          >
            <Textarea
              id="about"
              placeholder="Here is a sample placeholder"
              value={formik.values.about}
              onChange={formik.handleChange}
            />
            <FormErrorMessage>{formik.errors.about}</FormErrorMessage>
          </FormControl>
        </Box>

        <Box mb="5">
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color={useColorModeValue('blue.500', 'blue.300')}
            fontWeight="500"
            textTransform="uppercase"
            mb="4"
          >
            Contact Information
          </Text>
          <Text fontSize="lg">Phone Number</Text>
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
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              (will only be shared when the host accepts the stay request)
            </Text>
            <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
          </FormControl>
        </Box>

        <CustomButton title="Confirm Request" fullWidth isDisabled={formik.isSubmitting} />
      </Box>
    </form>
  )
}

export default Form
