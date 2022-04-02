import { PostCategory } from '@prisma/client'
import { OptionBase, Select } from 'chakra-react-select'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  value: string[]
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
]

const CategoryPicker = (props: Props) => {
  const { t } = useTranslation('common')
  return (
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
      placeholder={t('post.category.picker')}
      closeMenuOnSelect={false}
      size="md"
      isDisabled={props.isDisabled}
      onChange={values => props.onChange(values.map(val => val.value))}
    />
  )
}

export default CategoryPicker
