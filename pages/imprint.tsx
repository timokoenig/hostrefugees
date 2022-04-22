import { Box, Container, Heading, Text } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import { getOptionalSessionUser } from 'utils/session-user'
import Layout from '../components/layout'

type Props = {
  user?: MappedUser
  contactName: string
  contactAddress: string
  contactAddressCity: string
  contactAddressCountry: string
  contactEmail: string
}

const ImprintPage = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title.imprint')}</title>
      </Head>
      <Container maxW="7xl">
        <Box align="center">
          <Heading>{t('imprint')}</Heading>
          <Text mb="10">{t('imprint.information')}</Text>

          <Heading size="md">{t('imprint.legal')}</Heading>
          <Text mb="10">
            {props.contactName}
            <br />
            {props.contactAddress}
            <br />
            {props.contactAddressCity}
            <br />
            {props.contactAddressCountry}
          </Text>

          <Heading size="md">{t('imprint.contact')}</Heading>
          <Text mb="10">
            {t('imprint.email')}: {props.contactEmail}
          </Text>
        </Box>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  const sessionUser = await getOptionalSessionUser(context.req.session)

  return {
    props: {
      user: sessionUser,
      contactName: process.env.CONTACT_NAME ?? '',
      contactAddress: process.env.CONTACT_ADDRESS ?? '',
      contactAddressCity: process.env.CONTACT_ADDRESS_CITY ?? '',
      contactAddressCountry: process.env.CONTACT_ADDRESS_COUNTRY ?? '',
      contactEmail: process.env.CONTACT_EMAIL ?? '',
    },
  }
})

export default ImprintPage
