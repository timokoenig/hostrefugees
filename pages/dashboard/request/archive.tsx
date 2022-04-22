import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Heading, List, Stack, Text } from '@chakra-ui/react'
import { Request, UserRole } from '@prisma/client'
import RequestItem from 'components/dashboard/request-item'
import Layout from 'components/layout'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'
import prisma from 'prisma/client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import { getSessionUser } from 'utils/session-user'

type Props = {
  user: MappedUser
  requests: Request[]
}

const ArchivePage = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title.dashboard.request.archive')}</title>
      </Head>
      <Container maxW="7xl">
        <Box mb="5">
          <Button variant="ghost" pl={0} leftIcon={<ArrowBackIcon />} onClick={router.back}>
            {t('dashboard')}
          </Button>
        </Box>
        <Box align="center">
          <Heading as="h2" size="xl" mb="5">
            {t('request.archive')}
          </Heading>
        </Box>
        <Stack spacing={6}>
          {props.requests.length === 0 && <Text>{t('request.archive.empty')}</Text>}
          <List spacing="2">
            {props.requests.map((request, i) => (
              <RequestItem key={i} request={request} />
            ))}
          </List>
        </Stack>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user == undefined || context.req.session.user.role != UserRole.HOST) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionUser = await getSessionUser(context.req.session)

  // The archive has all requests older than 14 days
  const requests = await prisma.request.findMany({
    where: {
      place: {
        author: {
          id: context.req.session.user.id,
        },
      },
      createdAt: {
        lt: moment().subtract(14, 'days').toDate(),
      },
    },
    include: {
      author: {
        select: {
          id: true,
          firstname: true,
          languages: true,
        },
      },
      place: true,
    },
  })

  return {
    props: {
      user: sessionUser,
      requests,
    },
  }
})

export default ArchivePage
