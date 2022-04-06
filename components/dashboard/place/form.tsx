import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  StackDivider,
  Switch,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { BathroomType, Place, PlaceType } from '@prisma/client'
import DatePicker from 'components/common/datepicker'
import NumberInput from 'components/place/number-input'
import { useFormik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import Button from '../../common/button'

const validationSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short').max(100, 'Too Long').required('Required'),
  description: Yup.string().min(2, 'Too Short').max(1000, 'Too Long').required('Required'),
  rooms: Yup.number().required('Required'),
  beds: Yup.number().required('Required'),
  adults: Yup.number().required('Required'),
  children: Yup.number().required('Required'),
  addressStreet: Yup.string().min(2, 'Too Short').max(100, 'Too Long').required('Required'),
  addressHouseNumber: Yup.string().min(1, 'Too Short').max(100, 'Too Long').required('Required'),
  addressZip: Yup.string().min(5, 'Too Short').max(5, 'Too Long').required('Required'),
  addressCity: Yup.string().min(2, 'Too Short').max(100, 'Too Long').required('Required'),
  houseRules: Yup.string().max(1000, 'Too Long'),
  phoneNumber: Yup.string().min(2, 'Too Short').max(100, 'Too Long').required('Required'),
  arrivalInstructions: Yup.string().max(1000, 'Too Long'),
})

type Props = {
  place?: Place | undefined
  isLoading: boolean
  onChange: (place: Place) => void
}

const Form = (props: Props) => {
  const { t } = useTranslation('common')
  const formik = useFormik({
    initialValues: props.place ?? {
      id: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      approved: false,
      active: false,
      reserved: false,
      addressCityLat: '',
      addressCityLng: '',
      addressCountry: '',
      userId: '',
      title: '',
      titleTranslation: null,
      description: '',
      descriptionTranslation: null,
      type: PlaceType.PRIVATE,
      placeAdults: 1,
      placeChildren: 0,
      placeAdultWomen: false,
      placeAdultMen: false,
      rooms: 1,
      beds: 1,
      bathroom: BathroomType.SHARED,
      adults: 1,
      children: 0,
      pets: false,
      addressStreet: '',
      addressHouseNumber: '',
      addressZip: '',
      addressCity: '',
      houseRules: '',
      houseRulesTranslation: null,
      phoneNumber: '',
      arrivalInstructions: '',
      arrivalInstructionsTranslation: null,
      availabilityStart: new Date(),
      availabilityEnd: null,
      photos: [],
    },
    validationSchema,
    onSubmit: values => {
      if (!formik.isValid) return
      props.onChange(values)
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
              {t('general')}
            </Text>

            <FormControl
              isRequired
              isDisabled={formik.isSubmitting}
              isInvalid={formik.errors.title !== undefined && formik.touched.title}
            >
              <FormLabel htmlFor="title">{t('title')}</FormLabel>
              <Input
                id="title"
                type="text"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
              <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isDisabled={formik.isSubmitting}
              isInvalid={formik.errors.description !== undefined && formik.touched.description}
            >
              <FormLabel htmlFor="description">{t('description')}</FormLabel>
              <Textarea
                id="description"
                type="text"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
            </FormControl>

            <FormControl
              isDisabled={formik.isSubmitting}
              isInvalid={formik.errors.houseRules !== undefined && formik.touched.houseRules}
            >
              <FormLabel htmlFor="houseRules">{t('houserules')}</FormLabel>
              <Textarea
                id="houseRules"
                type="text"
                value={formik.values.houseRules}
                onChange={formik.handleChange}
              />
              <FormErrorMessage>{formik.errors.houseRules}</FormErrorMessage>
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
              {t('residents')}
            </Text>

            <FormControl isRequired isDisabled={formik.isSubmitting}>
              <FormLabel htmlFor="placeAdults">{t('dashboard.place.howmanyadults')}</FormLabel>
              <NumberInput
                active={false}
                value={formik.values.placeAdults}
                onChange={newVal => formik.setFieldValue('placeAdults', newVal)}
              />
              <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
            </FormControl>

            <FormControl isDisabled={formik.isSubmitting}>
              <FormLabel htmlFor="placeAdultWomen">{t('dashboard.place.anywomen')}</FormLabel>
              <Switch
                id="placeAdultWomen"
                size="lg"
                isChecked={formik.values.placeAdultWomen}
                onChange={() =>
                  formik.setFieldValue('placeAdultWomen', !formik.values.placeAdultWomen)
                }
              />
              <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
            </FormControl>

            <FormControl isDisabled={formik.isSubmitting}>
              <FormLabel htmlFor="placeAdultMen">{t('dashboard.place.anymen')}</FormLabel>
              <Switch
                id="placeAdultMen"
                size="lg"
                isChecked={formik.values.placeAdultMen}
                onChange={() => formik.setFieldValue('placeAdultMen', !formik.values.placeAdultMen)}
              />
              <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isDisabled={formik.isSubmitting}>
              <FormLabel htmlFor="placeChildren">{t('dashboard.place.howmanychildren')}</FormLabel>
              <NumberInput
                active={false}
                value={formik.values.placeChildren}
                onChange={newVal => formik.setFieldValue('placeChildren', newVal)}
              />
              <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
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
              {t('place.detail')}
            </Text>

            <FormControl isRequired isDisabled={formik.isSubmitting}>
              <FormLabel htmlFor="type">{t('place.detail.type')}</FormLabel>
              <Select
                id="type"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
              >
                <option value={PlaceType.PLACE}>{t('place.entire')}</option>
                <option value={PlaceType.PRIVATE}>{t('place.private')}</option>
                <option value={PlaceType.SHARED}>{t('place.shared')}</option>
              </Select>
              <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
            </FormControl>

            <FormControl
              textAlign="left"
              isRequired
              isDisabled={formik.isSubmitting}
              isInvalid={formik.errors.rooms !== undefined && formik.touched.rooms}
            >
              <FormLabel htmlFor="rooms">{t('rooms')}</FormLabel>
              <NumberInput
                active={false}
                min={1}
                value={formik.values.rooms}
                onChange={newVal => formik.setFieldValue('rooms', newVal)}
              />
              <FormErrorMessage>{formik.errors.rooms}</FormErrorMessage>
            </FormControl>

            <FormControl
              textAlign="left"
              isRequired
              isDisabled={formik.isSubmitting}
              isInvalid={formik.errors.beds !== undefined && formik.touched.beds}
            >
              <FormLabel htmlFor="beds">{t('beds')}</FormLabel>
              <NumberInput
                active={false}
                min={1}
                value={formik.values.beds}
                onChange={newVal => formik.setFieldValue('beds', newVal)}
              />
              <FormErrorMessage>{formik.errors.beds}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isDisabled={formik.isSubmitting}>
              <FormLabel htmlFor="bathroom">{t('bathroom')}</FormLabel>
              <Select
                id="bathroom"
                name="bathroom"
                value={formik.values.bathroom}
                onChange={formik.handleChange}
              >
                <option value={BathroomType.YES}>{t('bathroom.private')}</option>
                <option value={BathroomType.SHARED}>{t('bathroom.shared')}</option>
              </Select>
              <FormErrorMessage>{formik.errors.bathroom}</FormErrorMessage>
            </FormControl>

            <FormControl
              textAlign="left"
              isRequired
              isDisabled={formik.isSubmitting}
              isInvalid={formik.errors.adults !== undefined && formik.touched.adults}
            >
              <FormLabel htmlFor="adults">{t('dashboard.place.hostadults')}</FormLabel>
              <NumberInput
                active={false}
                min={1}
                value={formik.values.adults}
                onChange={newVal => formik.setFieldValue('adults', newVal)}
              />
              <FormErrorMessage>{formik.errors.adults}</FormErrorMessage>
            </FormControl>

            <FormControl
              textAlign="left"
              isRequired
              isDisabled={formik.isSubmitting}
              isInvalid={formik.errors.children !== undefined && formik.touched.children}
            >
              <FormLabel htmlFor="children">{t('dashboard.place.hostchildren')}</FormLabel>
              <NumberInput
                active={false}
                value={formik.values.children}
                onChange={newVal => formik.setFieldValue('children', newVal)}
              />
              <FormErrorMessage>{formik.errors.children}</FormErrorMessage>
            </FormControl>

            <FormControl isDisabled={formik.isSubmitting}>
              <FormLabel htmlFor="pets">{t('dashboard.place.pets')}</FormLabel>
              <Switch
                id="pets"
                size="lg"
                isChecked={formik.values.pets}
                onChange={() => formik.setFieldValue('pets', !formik.values.pets)}
              />
              <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
            </FormControl>
          </VStack>

          <VStack spacing={4} width="100%" align="flex-start">
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('blue.500', 'blue.300')}
                fontWeight="500"
                textTransform="uppercase"
                mb="4"
              >
                {t('dashboard.place.address')}
              </Text>
              <Text pb="4" color={useColorModeValue('gray.600', 'gray.400')}>
                {t('dashboard.place.address.info')}
              </Text>
            </Box>

            <FormControl
              isRequired
              isDisabled={formik.isSubmitting}
              isInvalid={formik.errors.addressStreet !== undefined && formik.touched.addressStreet}
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
                formik.errors.addressHouseNumber !== undefined && formik.touched.addressHouseNumber
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

            <FormControl
              isRequired
              isDisabled={formik.isSubmitting}
              isInvalid={formik.errors.addressZip !== undefined && formik.touched.addressZip}
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
              isInvalid={formik.errors.addressCity !== undefined && formik.touched.addressCity}
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
          </VStack>

          <VStack spacing={4} width="100%" align="flex-start">
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('blue.500', 'blue.300')}
                fontWeight="500"
                textTransform="uppercase"
              >
                {t('dashboard.place.contact')}
              </Text>
              <Text pb="4" color={useColorModeValue('gray.600', 'gray.400')}>
                {t('dashboard.place.contact.info')}
              </Text>
            </Box>

            <FormControl
              isRequired
              isDisabled={formik.isSubmitting}
              isInvalid={formik.errors.phoneNumber !== undefined && formik.touched.phoneNumber}
            >
              <FormLabel htmlFor="phoneNumber">{t('phone')}</FormLabel>
              <Input
                id="phoneNumber"
                type="text"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
              />
              <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
            </FormControl>

            <FormControl
              isDisabled={formik.isSubmitting}
              isInvalid={
                formik.errors.arrivalInstructions !== undefined &&
                formik.touched.arrivalInstructions
              }
            >
              <FormLabel htmlFor="arrivalInstructions">{t('dashboard.place.arrival')}</FormLabel>
              <Textarea
                id="arrivalInstructions"
                placeholder={t('dashboard.place.arrival.info')}
                value={formik.values.arrivalInstructions}
                onChange={formik.handleChange}
              />
              <FormErrorMessage>{formik.errors.arrivalInstructions}</FormErrorMessage>
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
              {t('availability')}
            </Text>

            <FormControl
              isRequired
              isDisabled={formik.isSubmitting}
              isInvalid={
                formik.errors.availabilityStart !== undefined &&
                formik.touched.availabilityStart !== undefined
              }
            >
              <FormLabel htmlFor="availabilityStart">{t('availability.start')}</FormLabel>
              <DatePicker
                value={formik.values.availabilityStart}
                onChange={newVal => formik.setFieldValue('availabilityStart', newVal)}
              />
              <FormErrorMessage>{formik.errors.availabilityStart}</FormErrorMessage>
            </FormControl>

            <FormControl
              isDisabled={formik.isSubmitting}
              isInvalid={
                formik.errors.availabilityEnd !== undefined && formik.touched.availabilityEnd
              }
            >
              <FormLabel htmlFor="availabilityEnd">
                {t('availability.end')} ({t('optional')})
              </FormLabel>
              <DatePicker
                value={formik.values.availabilityEnd}
                onChange={newVal => formik.setFieldValue('availabilityEnd', newVal)}
                onReset={() => formik.setFieldValue('availabilityEnd', null)}
              />
              <FormErrorMessage>{formik.errors.availabilityEnd}</FormErrorMessage>
            </FormControl>
          </VStack>

          <FormControl>
            <Button
              title={props.isLoading ? t('loading') : t('save')}
              fullWidth
              isDisabled={props.isLoading}
            />
          </FormControl>
        </VStack>
      </form>
    </Box>
  )
}

export default Form
