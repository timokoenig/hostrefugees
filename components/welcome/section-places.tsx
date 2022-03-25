import { Button, Heading, Icon, Link, Text, useColorModeValue } from '@chakra-ui/react'
import parse from 'html-react-parser'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IoBedSharp, IoOpenOutline } from 'react-icons/io5'
import Section from './section'

const SectionPlaces = () => {
  const { t } = useTranslation('common')
  return (
    <Section id="places" title={t('welcomegermany.feature.place')} icon={IoBedSharp} color="blue">
      <Heading as="h4" size="md">
        {t('welcomegermany.place.state')}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        {t('welcomegermany.place.state.info')}{' '}
        <Link
          href="https://bamf-navi.bamf.de/de/Themen/Behoerden"
          target="_blank"
          fontWeight="semibold"
        >
          https://bamf-navi.bamf.de/de/Themen/Behoerden{' '}
          <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
        </Link>
        .
      </Text>
      <Heading as="h4" size="md">
        {t('welcomegermany.place.private')}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        {parse(t('welcomegermany.place.private.info'))}
      </Text>
      <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
        <Button as={Link} href="/place" fontWeight="semibold">
          {t('welcomegermany.place.private.button')}
        </Button>
      </Text>
    </Section>
  )
}

export default SectionPlaces
