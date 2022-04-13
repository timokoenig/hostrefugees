import { Feature } from '@prisma/client'
import { OptionBase, Select } from 'chakra-react-select'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  value: string[]
  isDisabled?: boolean
  onChange: (categories: string[]) => void
}

interface PetOption extends OptionBase {
  label: string
  value: string
}

const availableTypes = [Feature.PET_CAT, Feature.PET_DOG]

const PetPicker = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Select<PetOption, true>
      isMulti
      name="features"
      value={props.value.map(cat => {
        return {
          label: t(cat.toLowerCase()),
          value: cat,
        }
      })}
      options={availableTypes
        .map(cat => {
          return {
            label: t(cat.toLowerCase()),
            value: cat,
          }
        })
        .sort((a, b) => (a.label > b.label ? 1 : -1))}
      placeholder={t('place.pets.picker')}
      closeMenuOnSelect={false}
      size="md"
      isDisabled={props.isDisabled}
      onChange={values => props.onChange(values.map(val => val.value))}
    />
  )
}

export default PetPicker
