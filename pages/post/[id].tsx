import { Post } from '@prisma/client'
import Layout from 'components/layout'
import PostComponent from 'components/post'
import Head from 'next/head'
import prisma from 'prisma/client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import { getOptionalSessionUser } from 'utils/session-user'

type Props = {
  user?: MappedUser
  posts: Post[]
  selectedPostId: string
}

const PostDetailPage = (props: Props) => {
  const { t } = useTranslation('common')

  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title.posts')}</title>
      </Head>
      <PostComponent posts={props.posts} selectedPostId={props.selectedPostId} />
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  const sessionUser = await getOptionalSessionUser(context.req.session)

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
      user: sessionUser,
      posts,
      selectedPostId: context.query.id as string,
    },
  }
})

export default PostDetailPage
