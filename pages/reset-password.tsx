import Head from 'next/head'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { withSessionSsr } from 'utils/session'
import Layout from '../components/layout'
import ResetPassword from '../components/reset-password'

const ResetPasswordPage = () => {
  const { t } = useTranslation('common')
  return (
    <Layout>
      <Head>
        <title>{t('page.title.login.resetpassword')}</title>
      </Head>
      <ResetPassword />
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user != undefined) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }
  if (context.query.hash == undefined) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return { props: {} }
})

export default ResetPasswordPage
