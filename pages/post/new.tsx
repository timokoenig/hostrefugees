import Layout from 'components/layout'
import NewPost from 'components/new-post'
import Head from 'next/head'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import { getOptionalSessionUser } from 'utils/session-user'

type Props = {
  user?: MappedUser
}

const NewPostPage = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title.post.new')}</title>
      </Head>
      <NewPost />
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

export default NewPostPage
