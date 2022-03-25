import { Container, Heading, Link } from '@chakra-ui/react'
import Item from 'components/help/item'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Layout from '../components/layout'

type Props = {
  user?: MappedUser
}

const HelpPage = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Layout user={props.user}>
      <Container maxW="7xl">
        <Heading as="h1" size="lg" mb="5">
          {t('help')}
        </Heading>
        <Item title={t('help.howtostay')}>
          <Trans i18nKey="help.howtostay.text" t={t}>
            a
            <Link href="/place" fontWeight="semibold">
              1
            </Link>
            b
          </Trans>
        </Item>
        <Item title={t('help.offerplace')}>
          <Trans i18nKey="help.offerplace.text" t={t}>
            a
            <Link href="/become-host" fontWeight="semibold">
              1
            </Link>
            b
          </Trans>
        </Item>
        <Item title={t('help.issue')}>
          <Trans i18nKey="help.issue.text" t={t}>
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
  return {
    props: {
      user: context.req.session.user ?? null,
    },
  }
})

export default HelpPage
