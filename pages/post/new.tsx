import Layout from 'components/layout'
import NewPost from 'components/new-post'
import Head from 'next/head'
import React from 'react'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'

type Props = {
  user?: MappedUser
}

const NewPostPage = (props: Props) => {
  return (
    <Layout user={props.user}>
      <Head>
        <title>HostRefugees - New Post</title>
      </Head>
      <NewPost />
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

export default NewPostPage
