import { Container, Heading, Link } from '@chakra-ui/react'
import Item from 'components/help/item'
import Head from 'next/head'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import { getOptionalSessionUser } from 'utils/session-user'
import Layout from '../components/layout'

type Props = {
  user?: MappedUser
}

const HelpPage = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title.help')}</title>
      </Head>
      <Container maxW="7xl">
        <Heading as="h1" size="lg" mb="5">
          {t('helpcenter')}
        </Heading>
        <Item title={t('helpcenter.howtostay')}>
          <Trans i18nKey="helpcenter.howtostay.text" t={t}>
            a
            <Link href="/place" fontWeight="semibold">
              1
            </Link>
            b
          </Trans>
        </Item>
        <Item title={t('helpcenter.offerplace')}>
          <Trans i18nKey="helpcenter.offerplace.text" t={t}>
            a
            <Link href="/become-host" fontWeight="semibold">
              1
            </Link>
            b
          </Trans>
        </Item>
        <Item title={t('helpcenter.issue')}>
          <Trans i18nKey="helpcenter.issue.text" t={t}>
            a
            <Link href="https://github.com/timokoenig/hostrefugees/issues" fontWeight="semibold">
              1
            </Link>
            b
          </Trans>
        </Item>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  const sessionUser = await getOptionalSessionUser(context.req.session)

  return {
    props: {
      user: sessionUser,
    },
  }
})

export default HelpPage
