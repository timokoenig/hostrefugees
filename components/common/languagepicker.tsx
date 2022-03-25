import { OptionBase, Select } from 'chakra-react-select'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  isDisabled?: boolean
  onChange: (languages: string[]) => void
}

interface LanguageOption extends OptionBase {
  label: string
  value: string
}

const availableLanguages = [
  'de',
  'en',
  'nl',
  'fr',
  'it',
  'dk',
  'gr',
  'pt',
  'es',
  'fi',
  'se',
  'cz',
  'ee',
  'hu',
  'lv',
  'lt',
  'mt',
  'pl',
  'sk',
  'sl',
  'bg',
  'ie',
  'ro',
  'hr',
  'ru',
]

const LanguagePicker = (props: Props) => {
  const { t } = useTranslation('common')
  const { t: tLang } = useTranslation('languages')
  return (
    <Select<LanguageOption, true>
      isMulti
      name="languages"
      options={availableLanguages
        .map(lang => {
          return {
            label: tLang(lang),
            value: lang,
          }
        })
        .sort((a, b) => (a.label > b.label ? 1 : -1))}
      placeholder={t('onboarding.language.picker')}
      closeMenuOnSelect={false}
      size="lg"
      isDisabled={props.isDisabled}
      onChange={values => props.onChange(values.map(lang => lang.value))}
    />
  )
}

export default LanguagePicker
