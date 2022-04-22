import { Post } from '@prisma/client'
import Layout from 'components/layout'
import PostComponent from 'components/post'
import Head from 'next/head'
import prisma from 'prisma/client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'

type Props = {
  user?: MappedUser
  posts: Post[]
}

const PostPage = (props: Props) => {
  const { t } = useTranslation('common')

  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title.posts')}</title>
      </Head>
      <PostComponent posts={props.posts} />
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  const posts = await prisma.post.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return {
    props: {
      user: context.req.session.user ?? null,
      posts,
    },
  }
})

export default PostPage
