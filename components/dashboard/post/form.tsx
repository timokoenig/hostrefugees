import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SimpleGrid,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { Post } from '@prisma/client'
import { useFormik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import CustomButton from '../../common/button'
import CategoryPicker from '../../post/category-picker'

const validationSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short').max(100, 'Too Long').required('Required'),
  description: Yup.string().min(2, 'Too Short').max(5000, 'Too Long').required('Required'),
  website: Yup.string().min(2, 'Too Short').max(200, 'Too Long'),
  phoneNumber: Yup.string().min(2, 'Too Short').max(50, 'Too Long'),
  addressStreet: Yup.string().min(2, 'Too Short').max(100, 'Too Long'),
  addressHouseNumber: Yup.string().min(1, 'Too Short').max(100, 'Too Long'),
  addressZip: Yup.string().min(5, 'Too Short').max(5, 'Too Long'),
  addressCity: Yup.string().min(2, 'Too Short').max(100, 'Too Long'),
})

type Props = {
  post?: Post | undefined
  isLoading: boolean
  onChange: (post: Post) => void
}

const Form = (props: Props) => {
  const { t } = useTranslation('common')
  const formik = useFormik({
    initialValues: props.post ?? {
      id: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      approved: false,
      title: '',
      titleTranslation: [],
      description: '',
      descriptionTranslation: [],
      category: [],
      website: '',
      phoneNumber: '',
      addressStreet: '',
      addressHouseNumber: '',
      addressZip: '',
      addressCity: '',
      addressCityLat: null,
      addressCityLng: null,
      addressCountry: '',
      userId: '',
    },
    validationSchema,
    onSubmit: async values => {
      if (!formik.isValid) return
      props.onChange(values)
    },
  })

  return (
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
          isInvalid={formik.errors.description !== undefined && formik.touched.description}
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

        <FormControl>
          <FormLabel htmlFor="category">{t('category')}</FormLabel>
          <CategoryPicker
            value={formik.values.category}
            isDisabled={formik.isSubmitting}
            onChange={values => formik.setFieldValue('category', values)}
          />
        </FormControl>

        <SimpleGrid templateColumns={{ base: '1fr', md: '2fr 1fr' }} spacing={5}>
          <FormControl
            isDisabled={formik.isSubmitting}
            isInvalid={formik.errors.addressStreet !== undefined && formik.touched.addressStreet}
          >
            <FormLabel htmlFor="addressStreet">{t('street')}</FormLabel>
            <Input
              id="addressStreet"
              type="text"
              value={formik.values.addressStreet ?? ''}
              onChange={formik.handleChange}
            />
            <FormErrorMessage>{formik.errors.addressStreet}</FormErrorMessage>
          </FormControl>

          <FormControl
            isDisabled={formik.isSubmitting}
            isInvalid={
              formik.errors.addressHouseNumber !== undefined && formik.touched.addressHouseNumber
            }
          >
            <FormLabel htmlFor="addressHouseNumber">{t('housenumber')}</FormLabel>
            <Input
              id="addressHouseNumber"
              type="text"
              value={formik.values.addressHouseNumber ?? ''}
              onChange={formik.handleChange}
            />
            <FormErrorMessage>{formik.errors.addressHouseNumber}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        <SimpleGrid templateColumns={{ base: '1fr', md: '1fr 2fr' }} spacing={5}>
          <FormControl
            isDisabled={formik.isSubmitting}
            isInvalid={formik.errors.addressZip !== undefined && formik.touched.addressZip}
          >
            <FormLabel htmlFor="addressZip">{t('zipcode')}</FormLabel>
            <Input
              id="addressZip"
              type="text"
              value={formik.values.addressZip ?? ''}
              onChange={formik.handleChange}
            />
            <FormErrorMessage>{formik.errors.addressZip}</FormErrorMessage>
          </FormControl>

          <FormControl
            isDisabled={formik.isSubmitting}
            isInvalid={formik.errors.addressCity !== undefined && formik.touched.addressCity}
          >
            <FormLabel htmlFor="addressCity">{t('city')}</FormLabel>
            <Input
              id="addressCity"
              type="text"
              value={formik.values.addressCity ?? ''}
              onChange={formik.handleChange}
            />
            <FormErrorMessage>{formik.errors.addressCity}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        <FormControl
          isDisabled={formik.isSubmitting}
          isInvalid={formik.errors.website !== undefined && formik.touched.website}
        >
          <FormLabel htmlFor="website">{t('website')}</FormLabel>
          <Input
            id="website"
            type="text"
            value={formik.values.website ?? ''}
            onChange={formik.handleChange}
          />
          <FormErrorMessage>{formik.errors.website}</FormErrorMessage>
        </FormControl>

        <FormControl
          isDisabled={formik.isSubmitting}
          isInvalid={formik.errors.phoneNumber !== undefined && formik.touched.phoneNumber}
        >
          <FormLabel htmlFor="phoneNumber">{t('phone')}</FormLabel>
          <Input
            id="phoneNumber"
            type="text"
            value={formik.values.phoneNumber ?? ''}
            onChange={formik.handleChange}
          />
          <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
        </FormControl>

        <CustomButton title={t('save')} fullWidth isDisabled={formik.isSubmitting} />
      </Stack>
    </form>
  )
}

export default Form
