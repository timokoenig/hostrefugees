/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Container, List, SimpleGrid, Text } from '@chakra-ui/react'
import { Place, Request, RequestStatus, SafetyCheck, User, UserRole } from '@prisma/client'
import RequestChat from 'components/chat/request-chat'
import RequestItem from 'components/dashboard/request-item'
import SafetyCheckComponent from 'components/dashboard/request/safety-check'
import Layout from 'components/layout'
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
  request: Request & { place: Place; author: User }
  requests: Request[]
  safetyCheck: SafetyCheck | null
}

const RequestPage = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title.dashboard.request')}</title>
      </Head>

      <Container maxW="7xl">
        <Box mb="5">
          <Button
            variant="ghost"
            pl={0}
            leftIcon={<ArrowBackIcon />}
            onClick={() => router.push('/dashboard')}
          >
            {t('dashboard')}
          </Button>
        </Box>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
          <Box>
            <List spacing="2">
              {props.requests.length == 0 && <Text>{t('dashboard.norequests')}</Text>}
              {props.requests.map((request, i) => (
                <RequestItem
                  key={i}
                  request={request}
                  isSelected={request.id == props.request.id}
                />
              ))}
            </List>
          </Box>
          <Box>
            <RequestChat request={props.request} user={props.user} />

            {props.request.status == RequestStatus.ACCEPTED && (
              <SafetyCheckComponent
                user={props.user}
                request={props.request}
                safetyCheck={props.safetyCheck}
              />
            )}
          </Box>
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

  const request = await prisma.request.findUnique({
    where: {
      id: context.query.id as string,
    },
    include: {
      author: {
        select: {
          id: true,
          firstname: true,
          languages: true,
        },
      },
      place: {
        include: {
          author: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  })
  if (
    request === null ||
    (context.req.session.user.role !== UserRole.ADMIN &&
      request.author.id !== context.req.session.user.id &&
      request.place.author.id !== context.req.session.user.id)
  ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const requestsWhere =
    context.req.session.user.role === UserRole.HOST
      ? {
          place: {
            author: {
              id: context.req.session.user.id,
            },
          },
        }
      : {
          author: {
            id: context.req.session.user.id,
          },
        }
  const requests = await prisma.request.findMany({
    where: requestsWhere,
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

  const safetyCheck = await prisma.safetyCheck.findFirst({
    where: {
      author: {
        id: context.req.session.user.id,
      },
      request: {
        id: request.id,
      },
    },
    include: {
      author: {
        select: {
          id: true,
          role: true,
        },
      },
    },
  })

  return {
    props: {
      user: sessionUser,
      request,
      requests,
      safetyCheck,
    },
  }
})

export default RequestPage
