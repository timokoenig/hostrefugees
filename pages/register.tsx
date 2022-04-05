import Head from 'next/head'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { withSessionSsr } from 'utils/session'
import Layout from '../components/layout'
import Register from '../components/register'

const RegisterPage = () => {
  const { t } = useTranslation('common')
  return (
    <Layout>
      <Head>
        <title>{t('page.title.registration')}</title>
      </Head>
      <Register />
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

export default RegisterPage
