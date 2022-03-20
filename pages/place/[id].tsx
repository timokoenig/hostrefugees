import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Center } from '@chakra-ui/react'
import { Request, UserRole } from '@prisma/client'
import Detail from 'components/place/detail'
import { useRouter } from 'next/router'
import prisma from 'prisma/client'
import React from 'react'
import { mapPlace } from 'utils/mapper'
import { MappedPlace, MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Layout from '../../components/layout'

type Props = {
  user?: MappedUser
  place: MappedPlace
  request: Request | null
}

const PlaceDetailPage = (props: Props) => {
  const router = useRouter()
  return (
    <Layout user={props.user}>
      <Center>
        <Box maxW="7xl">
          <Box mb="5">
            <Button
              variant="ghost"
              leftIcon={<ArrowBackIcon />}
              onClick={() => router.push('/place')}
            >
              Available Places
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
        },
      },
    },
  })
  if (place == null) {
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
      user: context.req.session.user ?? null,
      place: mapPlace(place),
      request,
    },
  }
})

export default PlaceDetailPage
