import { Box } from '@chakra-ui/react'
import { OptionBase, Select, Size } from 'chakra-react-select'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  availableValues: string[]
  value: string[]
  size?: Size
  isDisabled?: boolean
  onChange: (city: string[]) => void
}

interface CityOption extends OptionBase {
  label: string
  value: string
}

const CityPicker = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Box minWidth="200">
      <Select<CityOption, true>
        isMulti
        name="city"
        value={props.value.map(cat => {
          return {
            label: cat,
            value: cat,
          }
        })}
        options={props.availableValues
          .map(cat => {
            return {
              label: cat,
              value: cat,
            }
          })
          .sort((a, b) => (a.label > b.label ? 1 : -1))}
        closeMenuOnSelect={true}
        size={props.size ?? 'md'}
        placeholder={t('city')}
        isDisabled={props.isDisabled}
        onChange={values => props.onChange(values.map(val => val.value))}
      />
    </Box>
  )
}

export default CityPicker
