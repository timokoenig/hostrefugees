import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Container, GridItem, Heading, SimpleGrid, useToast } from '@chakra-ui/react'
import { Post } from '@prisma/client'
import Form from 'components/dashboard/post/form'
import Layout from 'components/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import prisma from 'prisma/client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import { getSessionUser } from 'utils/session-user'

type Props = {
  user: MappedUser
  post: Post
}

const PostPage = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const toast = useToast()
  const [isLoading, setLoading] = useState<boolean>(false)

  const onUpdate = async (post: Post) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/post/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      })
      if (res.ok) {
        router.back()
      } else {
        toast({
          title: 'Request failed',
          description: 'Please try again',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
    } catch {
      toast({
        title: 'Request failed',
        description: 'Please try again',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
    setLoading(false)
  }

  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title.dashboard.posts')}</title>
      </Head>
      <Container maxW="7xl">
        <Box mb="5">
          <Button variant="ghost" pl={0} leftIcon={<ArrowBackIcon />} onClick={router.back}>
            {t('dashboard')}
          </Button>
        </Box>
        <Heading as="h2" size="lg" mb="10">
          {t('post.update')}
        </Heading>
        <SimpleGrid templateColumns={{ sm: '1fr', md: '3fr 1fr' }} spacing={5}>
          <GridItem>
            <Form post={props.post} onChange={onUpdate} isLoading={isLoading} />
          </GridItem>
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user == undefined) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionUser = await getSessionUser(context.req.session)

  const post = await prisma.post.findFirst({
    where: {
      id: context.query.id as string,
      author: {
        id: context.req.session.user.id,
      },
      deleted: false,
    },
  })
  if (post == null) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: sessionUser,
      post,
    },
  }
})

export default PostPage
