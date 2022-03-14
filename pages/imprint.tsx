import { Container, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const ImprintPage = () => {
  const { t } = useTranslation('common')
  return (
    <Container marginTop={10}>
      <Heading>{t('imprint')}</Heading>
      <Text mb="10">{t('imprint.information')}</Text>

      <Heading size="md">{t('imprint.legal')}</Heading>
      <Text mb="10">
        {process.env.NEXT_PUBLIC_CONTACT_NAME}
        <br />
        {process.env.NEXT_PUBLIC_CONTACT_ADDRESS}
        <br />
        {process.env.NEXT_PUBLIC_CONTACT_ADDRESS_CITY}
        <br />
        {process.env.NEXT_PUBLIC_CONTACT_ADDRESS_COUNTRY}
      </Text>

      <Heading size="md">{t('imprint.contact')}</Heading>
      <Text mb="10">
        {t('imprint.email')}: {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
      </Text>
    </Container>
  )
}

export default ImprintPage
