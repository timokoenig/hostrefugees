import { Box, Container, Heading, Text } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Layout from '../components/layout'

type Props = {
  user?: MappedUser
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
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  return {
    props: {
      user: context.req.session.user ?? null,
    },
  }
})

export default ImprintPage
