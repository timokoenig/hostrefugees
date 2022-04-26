import { Box } from '@chakra-ui/react'
import { PostCategory } from '@prisma/client'
import { OptionBase, Select, Size } from 'chakra-react-select'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  value: string[]
  size?: Size
  isDisabled?: boolean
  onChange: (categories: string[]) => void
}

interface CategoryOption extends OptionBase {
  label: string
  value: string
}

const availableCategories = [
  PostCategory.EDUCATION,
  PostCategory.HELP,
  PostCategory.KIDS,
  PostCategory.OTHER,
  PostCategory.OUTDOOR,
  PostCategory.SPORT,
  PostCategory.INSURANCE,
]

const CategoryPicker = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Box minWidth="200">
      <Select<CategoryOption, true>
        isMulti
        name="category"
        value={props.value.map(cat => {
          return {
            label: t(cat.toLowerCase()),
            value: cat,
          }
        })}
        options={availableCategories
          .map(cat => {
            return {
              label: t(cat.toLowerCase()),
              value: cat,
            }
          })
          .sort((a, b) => (a.label > b.label ? 1 : -1))}
        placeholder={t('category')}
        closeMenuOnSelect={false}
        size={props.size ?? 'md'}
        isDisabled={props.isDisabled}
        onChange={values => props.onChange(values.map(val => val.value))}
      />
    </Box>
  )
}

export default CategoryPicker
