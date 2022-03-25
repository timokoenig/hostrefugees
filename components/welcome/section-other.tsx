import { Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IoBookSharp } from 'react-icons/io5'
import Section from './section'

const SectionOther = () => {
  const { t } = useTranslation('common')
  return (
    <Section id="other" title={t('welcomegermany.feature.other')} icon={IoBookSharp} color="purple">
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        {t('welcomegermany.other.info')}
      </Text>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>{t('lastupdate')}: 23.03.2022</Text>
    </Section>
  )
}

export default SectionOther
