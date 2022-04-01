import { OptionBase, Select } from 'chakra-react-select'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  availableValues: string[]
  value: string
  isDisabled?: boolean
  onChange: (city: string) => void
}

interface CityOption extends OptionBase {
  label: string
  value: string
}

const CityPicker = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Select<CityOption, false>
      name="city"
      value={{
        label: t(props.value),
        value: props.value,
      }}
      options={props.availableValues
        .map(cat => {
          return {
            label: t(cat),
            value: cat,
          }
        })
        .sort((a, b) => (a.label > b.label ? 1 : -1))}
      closeMenuOnSelect={true}
      size="md"
      isDisabled={props.isDisabled}
      onChange={value => props.onChange(value?.value ?? '')}
    />
  )
}

export default CityPicker
