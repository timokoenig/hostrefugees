import { Container, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Layout from '../../components/layout'

const CookieForm = dynamic(() => import('../../components/privacy/cookie-form'), {
  ssr: false,
})

type Props = {
  user?: MappedUser
}

const HelpPage = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title.privacy.cookies')}</title>
      </Head>
      <Container maxW="7xl">
        <Heading as="h1" size="lg" mb="5">
          {t('privacy.cookie')}
        </Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')} mb="5">
          {t('privacy.cookie.text1')}
        </Text>
        <Text color={useColorModeValue('gray.600', 'gray.400')} mb="10">
          {t('privacy.cookie.text2')}
        </Text>
        <CookieForm />
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

export default HelpPage
