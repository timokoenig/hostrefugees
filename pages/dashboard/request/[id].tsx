/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { Request, RequestStatus, SafetyCheck, UserRole } from '@prisma/client'
import SafetyCheckComponent from 'components/dashboard/request/safety-check'
import Layout from 'components/layout'
import Summary from 'components/place/summary'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'
import prisma from 'prisma/client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import { getSessionUser } from 'utils/session-user'
import StatusGuest from '../../../components/dashboard/request/status-guest'
import StatusHost from '../../../components/dashboard/request/status-host'

type Props = {
  user: MappedUser
  request: Request
  safetyCheck: SafetyCheck | null
}

const RequestPage = (props: Props) => {
  const { t } = useTranslation('common')
  const { t: tLang } = useTranslation('languages')
  const router = useRouter()
  const toast = useToast()

  const updateRequestStatus = async (status: RequestStatus) => {
    try {
      const res = await fetch(`/api/request/${props.request.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
        }),
      })
      if (res.ok) {
        router.reload()
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
  }

  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title.dashboard.request')}</title>
      </Head>

      <Container maxW="7xl">
        <Box mb="5">
          <Button variant="ghost" pl={0} leftIcon={<ArrowBackIcon />} onClick={router.back}>
            {t('dashboard')}
          </Button>
        </Box>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
          <Box>
            <Summary place={(props.request as any).place} />
          </Box>
          <Box>
            <Box mb="5">
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('blue.500', 'blue.300')}
                fontWeight="500"
                textTransform="uppercase"
                mb="4"
              >
                {t('request.detail')}
              </Text>
              <Text>
                {t('request.detail.requested')}:{' '}
                <Text as="span" fontWeight="semibold">
                  {moment(props.request.createdAt).format('DD.MM.YYYY HH:mm')}
                </Text>
              </Text>
              <Text>
                {t('adults')}:{' '}
                <Text as="span" fontWeight="semibold">
                  {props.request.adults}
                </Text>
              </Text>
              <Text>
                {t('children')}:{' '}
                <Text as="span" fontWeight="semibold">
                  {props.request.children}
                </Text>
              </Text>
              <Text>
                {t('pets')}:{' '}
                <Text as="span" fontWeight="semibold">
                  {props.request.pets ? 'Yes' : 'No'}
                </Text>
              </Text>
              {props.user.role === UserRole.HOST && (
                <Text>
                  {t('languages.guest')}:{' '}
                  <Text as="span" fontWeight="semibold">
                    {(props.request as any).author.languages
                      .map((lang: string) => tLang(lang))
                      .join(', ')}
                  </Text>
                </Text>
              )}
            </Box>

            <Box mb="20">
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('blue.500', 'blue.300')}
                fontWeight="500"
                textTransform="uppercase"
                mb="4"
              >
                {t('about')}
              </Text>
              <Text>{props.request.about.length == 0 ? 'N/A' : props.request.about}</Text>
            </Box>

            <Box mb="10">
              {props.user.role === UserRole.HOST && (
                <StatusHost
                  status={props.request.status}
                  onAccept={() => updateRequestStatus(RequestStatus.ACCEPTED)}
                  onDecline={() => updateRequestStatus(RequestStatus.DECLINED)}
                />
              )}
              {props.user.role === UserRole.GUEST && (
                <StatusGuest
                  status={props.request.status}
                  onCancelRequest={() => updateRequestStatus(RequestStatus.CANCELED)}
                />
              )}
            </Box>

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
      safetyCheck,
    },
  }
})

export default RequestPage
