import { Heading, ListItem, Text, UnorderedList, useColorModeValue } from '@chakra-ui/react'
import parse from 'html-react-parser'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IoMedicalSharp } from 'react-icons/io5'
import Section from './section'

const SectionCovid = () => {
  const { t } = useTranslation('common')
  return (
    <Section id="covid" title={t('welcomegermany.feature.covid')} icon={IoMedicalSharp} color="red">
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        {t('welcomegermany.covid.info')}
      </Text>

      <Heading as="h4" size="md">
        {t('welcomegermany.covid.contacts')}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        {parse(t('welcomegermany.covid.contacts.info'))}
      </Text>

      <Heading as="h4" size="md">
        {t('welcomegermany.covid.mask')}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        {t('welcomegermany.covid.mask.info')}
      </Text>

      <Heading as="h4" size="md">
        {t('welcomegermany.covid.3g')}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        {t('welcomegermany.covid.3g.info')}
        <UnorderedList>
          <ListItem>{t('welcomegermany.covid.3g.1')}</ListItem>
          <ListItem>{t('welcomegermany.covid.3g.2')}</ListItem>
          <ListItem>{t('welcomegermany.covid.3g.3')}</ListItem>
        </UnorderedList>
      </Text>

      <Heading as="h4" size="md">
        {t('welcomegermany.covid.2g')}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        {t('welcomegermany.covid.2g.info')}
        <UnorderedList>
          <ListItem>{t('welcomegermany.covid.2g.1')}</ListItem>
        </UnorderedList>
      </Text>

      <Heading as="h4" size="md">
        {t('welcomegermany.covid.test')}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        {t('welcomegermany.covid.test.info')}
        <UnorderedList>
          <ListItem>{t('welcomegermany.covid.test.1')}</ListItem>
          <ListItem>{t('welcomegermany.covid.test.2')}</ListItem>
          <ListItem>{t('welcomegermany.covid.test.3')}</ListItem>
        </UnorderedList>
      </Text>
    </Section>
  )
}

export default SectionCovid
