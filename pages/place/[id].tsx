import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Center } from '@chakra-ui/react'
import { Request, UserRole } from '@prisma/client'
import Detail from 'components/place/detail'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'
import prisma from 'prisma/client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { mapPlace } from 'utils/mapper'
import { MappedPlace, MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import { getOptionalSessionUser } from 'utils/session-user'
import Layout from '../../components/layout'

type Props = {
  user?: MappedUser
  place: MappedPlace
  request: Request | null
}

const PlaceDetailPage = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title.place', { title: props.place.title })}</title>
      </Head>
      <Center>
        <Box maxW="7xl">
          <Box mb="5">
            <Button
              variant="ghost"
              leftIcon={<ArrowBackIcon />}
              onClick={() => router.push('/place')}
            >
              {t('place.available')}
            </Button>
          </Box>
          <Detail
            place={props.place}
            request={props.request}
            enableRequest={!props.user || props.user.role !== UserRole.HOST}
          />
        </Box>
      </Center>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  const sessionUser = await getOptionalSessionUser(context.req.session)

  const place = await prisma.place.findUnique({
    where: {
      id: context.query.id as string,
    },
    include: {
      author: {
        select: {
          id: true,
          firstname: true,
          languages: true,
          verified: true,
        },
      },
    },
  })
  if (
    place == null ||
    !place.active ||
    place.deleted ||
    (place.availabilityEnd !== null && moment(place.availabilityEnd).isBefore(moment()))
  ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  // Check if user has already a request with the status WAITING
  const request = await prisma.request.findFirst({
    where: {
      author: {
        id: context.req.session.user?.id ?? '',
      },
      place: {
        id: place.id,
      },
      status: null,
    },
  })

  return {
    props: {
      user: sessionUser,
      place: mapPlace(place),
      request,
    },
  }
})

export default PlaceDetailPage
