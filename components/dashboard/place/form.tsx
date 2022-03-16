import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  StackDivider,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { BathroomType, Place, PlaceType } from '@prisma/client'
import NumberInput from 'components/place/number-input'
import { useFormik } from 'formik'
import moment from 'moment'
import React from 'react'
import Button from '../../common/button'

type Props = {
  place?: Place | undefined
}

const Form = (props: Props) => {
  const formik = useFormik({
    initialValues: props.place ?? {
      title: '',
      description: '',
      type: PlaceType.PRIVATE,
      rooms: 1,
      beds: 1,
      bathroom: BathroomType.SHARED,
      adults: 1,
      children: 0,
      addressStreet: '',
      addressHouseNumber: '',
      addressZip: '',
      addressCity: '',
      houseRules: '',
      availabilityStart: new Date(),
      availabilityEnd: undefined,
    },
    onSubmit: values => {
      console.log(values)
    },
  })
  return (
    <Box mb="5">
      <form onSubmit={formik.handleSubmit}>
        <VStack
          spacing={10}
          align="flex-start"
          divider={<StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />}
        >
          <VStack spacing={4} width="100%" align="flex-start">
            <Text
              fontSize={{ base: '16px', lg: '18px' }}
              color={useColorModeValue('blue.500', 'blue.300')}
              fontWeight="500"
              textTransform="uppercase"
              mb="4"
            >
              General
            </Text>

            <FormControl>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                type="text"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                id="description"
                type="text"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="houseRules">House Rules</FormLabel>
              <Textarea
                id="houseRules"
                type="text"
                value={formik.values.houseRules}
                onChange={formik.handleChange}
              />
            </FormControl>
          </VStack>

          <VStack spacing={4} width="100%" align="flex-start">
            <Text
              fontSize={{ base: '16px', lg: '18px' }}
              color={useColorModeValue('blue.500', 'blue.300')}
              fontWeight="500"
              textTransform="uppercase"
              mb="4"
            >
              Place Details
            </Text>

            <FormControl>
              <FormLabel htmlFor="type">Type of place</FormLabel>
              <Select
                id="type"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
              >
                <option value="place">Entire Place</option>
                <option value="private">Private Room</option>
                <option value="shared">Shared Room</option>
              </Select>
            </FormControl>

            <FormControl textAlign="left">
              <FormLabel htmlFor="rooms">Rooms</FormLabel>
              <NumberInput
                active={false}
                min={1}
                value={formik.values.rooms}
                onChange={newVal => formik.setFieldValue('rooms', newVal)}
              />
            </FormControl>

            <FormControl textAlign="left">
              <FormLabel htmlFor="beds">Beds</FormLabel>
              <NumberInput
                active={false}
                min={1}
                value={formik.values.beds}
                onChange={newVal => formik.setFieldValue('beds', newVal)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="bathroom">Bathroom</FormLabel>
              <Select
                id="bathroom"
                name="bathroom"
                value={formik.values.bathroom}
                onChange={formik.handleChange}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="shared">Shared</option>
              </Select>
            </FormControl>

            <FormControl textAlign="left">
              <FormLabel htmlFor="adults">Adults</FormLabel>
              <NumberInput
                active={false}
                min={1}
                value={formik.values.adults}
                onChange={newVal => formik.setFieldValue('adults', newVal)}
              />
            </FormControl>

            <FormControl textAlign="left">
              <FormLabel htmlFor="children">Children</FormLabel>
              <NumberInput
                active={false}
                value={formik.values.children}
                onChange={newVal => formik.setFieldValue('children', newVal)}
              />
            </FormControl>
          </VStack>

          <VStack spacing={4} width="100%" align="flex-start">
            <Text
              fontSize={{ base: '16px', lg: '18px' }}
              color={useColorModeValue('blue.500', 'blue.300')}
              fontWeight="500"
              textTransform="uppercase"
              mb="4"
            >
              Place Address
            </Text>

            <FormControl>
              <FormLabel htmlFor="addressStreet">Street</FormLabel>
              <Input
                id="addressStreet"
                type="text"
                value={formik.values.addressStreet}
                onChange={formik.handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="addressHouseNumber">House Number</FormLabel>
              <Input
                id="addressHouseNumber"
                type="text"
                value={formik.values.addressHouseNumber}
                onChange={formik.handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="addressZip">Zipcode</FormLabel>
              <Input
                id="addressZip"
                type="text"
                value={formik.values.addressZip}
                onChange={formik.handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="addressCity">City</FormLabel>
              <Input
                id="addressCity"
                type="text"
                value={formik.values.addressCity}
                onChange={formik.handleChange}
              />
            </FormControl>
          </VStack>

          <VStack spacing={4} width="100%" align="flex-start">
            <Text
              fontSize={{ base: '16px', lg: '18px' }}
              color={useColorModeValue('blue.500', 'blue.300')}
              fontWeight="500"
              textTransform="uppercase"
              mb="4"
            >
              Availability
            </Text>

            <FormControl>
              <FormLabel htmlFor="availabilityStart">Availability Start</FormLabel>
              <Input
                id="availabilityStart"
                type="text"
                value={moment(formik.values.availabilityStart).format('DD.MM.YYYY')}
                onChange={formik.handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="availabilityEnd">Availability End (optional)</FormLabel>
              <Input
                id="availabilityEnd"
                type="text"
                value={
                  formik.values.availabilityEnd === undefined
                    ? ''
                    : moment(formik.values.availabilityEnd).format('DD.MM.YYYY')
                }
                onChange={formik.handleChange}
              />
            </FormControl>
          </VStack>

          <FormControl>
            <Button title="Save" fullWidth />
          </FormControl>
        </VStack>
      </form>
    </Box>
  )
}

export default Form
