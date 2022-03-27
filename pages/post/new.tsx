import Layout from 'components/layout'
import NewPost from 'components/new-post'
import Head from 'next/head'
import React from 'react'

const NewPostPage = () => {
  return (
    <Layout>
      <Head>
        <title>HostRefugees - New Post</title>
      </Head>
      <NewPost />
    </Layout>
  )
}

export default NewPostPage
