import { OptionBase, Select, Size } from 'chakra-react-select'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  availableValues: string[]
  value: string
  size?: Size
  isDisabled?: boolean
  onChange: (city: string) => void
}

interface CityOption extends OptionBase {
  label: string
  value: string
}

const CityPicker = (props: Props) => {
  const { t } = useTranslation('common')
  const options = [
    {
      label: t('post.city.picker.all'),
      value: '',
    },
    ...props.availableValues
      .map(cat => {
        return {
          label: t(cat),
          value: cat,
        }
      })
      .sort((a, b) => (a.label > b.label ? 1 : -1)),
  ]
  return (
    <Select<CityOption, false>
      name="city"
      value={
        props.value == ''
          ? null
          : {
              label: t(props.value),
              value: props.value,
            }
      }
      options={options}
      closeMenuOnSelect={true}
      size={props.size ?? 'md'}
      placeholder={t('post.city.picker')}
      isDisabled={props.isDisabled}
      onChange={value => props.onChange(value?.value ?? '')}
    />
  )
}

export default CityPicker
