/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Container, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'
import { Request, UserRole } from '@prisma/client'
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
import StatusGuest from '../../../components/dashboard/request/status-guest'
import StatusHost from '../../../components/dashboard/request/status-host'

type Props = {
  user: MappedUser
  request: Request
}

const RequestPage = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  return (
    <Layout user={props.user}>
      <Head>
        <title>HostRefugees</title>
      </Head>

      <Container maxW="7xl">
        <Box mb="5">
          <Button variant="ghost" leftIcon={<ArrowBackIcon />} onClick={router.back}>
            Dashboard
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
                Stay Request Details
              </Text>
              <Text>
                Requested on:{' '}
                <Text as="span" fontWeight="semibold">
                  {moment(props.request.createdAt).format('DD.MM.YYYY HH:mm')}
                </Text>
              </Text>
              <Text>
                Adults:{' '}
                <Text as="span" fontWeight="semibold">
                  {props.request.adults}
                </Text>
              </Text>
              <Text>
                Children:{' '}
                <Text as="span" fontWeight="semibold">
                  {props.request.children}
                </Text>
              </Text>
              <Text>
                Guest Languages:{' '}
                <Text as="span" fontWeight="semibold">
                  {(props.request as any).author.languages
                    .map((lang: string) => t(`lang.${lang}`))
                    .join(', ')}
                </Text>
              </Text>
            </Box>

            <Box mb="20">
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('blue.500', 'blue.300')}
                fontWeight="500"
                textTransform="uppercase"
                mb="4"
              >
                About
              </Text>
              <Text>{props.request.about.length == 0 ? 'N/A' : props.request.about}</Text>
            </Box>

            {props.user.role === UserRole.HOST && <StatusHost status={props.request.status} />}
            {props.user.role === UserRole.GUEST && (
              <StatusGuest
                status={props.request.status}
                onCancelRequest={() => {
                  // TODO implement cancel functionality
                }}
              />
            )}
          </Box>
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user === undefined) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

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
    (context.req.session.user?.role !== UserRole.ADMIN &&
      request.author.id !== context.req.session.user?.id &&
      request.place.author.id !== context.req.session.user?.id)
  ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: context.req.session.user,
      request,
    },
  }
})

export default RequestPage
