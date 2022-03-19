import { OptionBase, Select } from 'chakra-react-select'
import React from 'react'

type Props = {
  isDisabled?: boolean
  onChange: (languages: string[]) => void
}

interface LanguageOption extends OptionBase {
  label: string
  value: string
}

const LanguagePicker = (props: Props) => {
  return (
    <Select<LanguageOption, true>
      isMulti
      name="languages"
      options={[
        { label: 'English', value: 'en' },
        { label: 'German', value: 'de' },
      ]}
      placeholder="Select at least one language"
      closeMenuOnSelect={false}
      size="lg"
      isDisabled={props.isDisabled}
      onChange={values => props.onChange(values.map(lang => lang.value))}
    />
  )
}

export default LanguagePicker
