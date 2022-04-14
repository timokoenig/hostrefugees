import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  StackDivider,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { BathroomType, Feature, HostType, Place, PlaceType } from '@prisma/client'
import DatePicker from 'components/common/datepicker'
import NumberInput from 'components/place/number-input'
import { useFormik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import Button from '../../common/button'
import PetPicker from './pet-picker'

const validationSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short').max(100, 'Too Long').trim().required('Required'),
  description: Yup.string().min(2, 'Too Short').max(5000, 'Too Long').trim().required('Required'),
  petsNumber: Yup.number().required('Required'),
  features: Yup.array().min(1, 'Nothing selected').required('Required'),
  addressStreet: Yup.string().min(2, 'Too Short').max(100, 'Too Long').trim().required('Required'),
  addressHouseNumber: Yup.string()
    .min(1, 'Too Short')
    .max(100, 'Too Long')
    .trim()
    .required('Required'),
  addressZip: Yup.string().min(5, 'Too Short').max(5, 'Too Long').trim().required('Required'),
  addressCity: Yup.string().min(2, 'Too Short').max(100, 'Too Long').trim().required('Required'),
  phoneNumber: Yup.string().min(2, 'Too Short').max(100, 'Too Long').trim().required('Required'),
})

type Props = {
  place?: Place | undefined
  isLoading: boolean
  onChange: (place: Place) => void
}

const PetsForm = (props: Props) => {
  const { t } = useTranslation('common')
  const textColor = useColorModeValue('gray.600', 'gray.400')
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
      hostType: HostType.PETS,
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
      petsNumber: 1,
      features: [],
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

            <FormControl
              textAlign="left"
              isRequired
              isDisabled={formik.isSubmitting}
              isInvalid={formik.errors.petsNumber !== undefined && formik.touched.petsNumber}
            >
              <FormLabel htmlFor="petsNumber">{t('place.pets')}</FormLabel>
              <NumberInput
                active={false}
                min={1}
                value={formik.values.petsNumber ?? 1}
                onChange={newVal => formik.setFieldValue('petsNumber', newVal)}
              />
              <FormErrorMessage>{formik.errors.petsNumber}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="features">{t('place.pets.type')}</FormLabel>
              <PetPicker
                value={formik.values.features}
                isDisabled={formik.isSubmitting}
                onChange={values => formik.setFieldValue('features', values)}
              />
            </FormControl>
            {formik.values.features.includes(Feature.PET_OTHER) && (
              <Text fontSize="sm" color={textColor}>
                {t('place.pets.type.other')}
              </Text>
            )}
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

export default PetsForm
