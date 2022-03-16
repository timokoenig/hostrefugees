import {
  Box,
  Flex,
  FormControl,
  Heading,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { MappedPlace } from 'utils/models'
import CustomButton from '../common/button'
import NumberInput from '../place/number-input'

type Props = {
  place: MappedPlace
}

const Form = (props: Props) => {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      adults: 1,
      children: 0,
      about: '',
    },
    onSubmit: values => {
      console.log(values)
      router.replace(`/place/${props.place.id}/confirmation`).catch(console.log)
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
              <Text flex="1" fontSize="lg">
                Adults (max {props.place.adults})
              </Text>
              <NumberInput
                active={true}
                value={formik.values.adults}
                min={1}
                max={props.place.adults}
                onChange={newVal => formik.setFieldValue('adults', newVal)}
              />
            </Flex>
          </Box>
          <Box>
            <Flex>
              <Text flex="1" fontSize="lg">
                Children (max {props.place.children})
              </Text>
              <NumberInput
                active={true}
                value={formik.values.children}
                max={props.place.children}
                onChange={newVal => formik.setFieldValue('children', newVal)}
              />
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
          <FormControl>
            <Textarea
              id="about"
              placeholder="Here is a sample placeholder"
              value={formik.values.about}
              onChange={formik.handleChange}
            />
          </FormControl>
        </Box>

        <CustomButton title="Confirm Request" fullWidth />
      </Box>
    </form>
  )
}

export default Form
