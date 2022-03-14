import { Box, Container, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Footer from '../components/footer'
import Navigation from '../components/navigation'

const ImprintPage = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <Navigation />
      <Container maxW="7xl">
        <Box align="center">
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
        </Box>
      </Container>
      <Footer />
    </>
  )
}

export default ImprintPage
