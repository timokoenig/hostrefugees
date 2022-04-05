import Head from 'next/head'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { withSessionSsr } from 'utils/session'
import ForgotPassword from '../components/forgot-password'
import Layout from '../components/layout'

const ForgotPasswordPage = () => {
  const { t } = useTranslation('common')
  return (
    <Layout>
      <Head>
        <title>{t('page.title.login.forgotpassword')}</title>
      </Head>
      <ForgotPassword />
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user !== undefined) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }
  return { props: {} }
})

export default ForgotPasswordPage
