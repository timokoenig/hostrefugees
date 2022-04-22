import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Container, SimpleGrid } from '@chakra-ui/react'
import { UserRole } from '@prisma/client'
import Form from 'components/request/form'
import Head from 'next/head'
import { useRouter } from 'next/router'
import prisma from 'prisma/client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { mapPlace } from 'utils/mapper'
import { MappedPlace, MappedUser } from 'utils/models'
import { onboardingCheck } from 'utils/onboarding-check'
import { withSessionSsr } from 'utils/session'
import { getSessionUser } from 'utils/session-user'
import Layout from '../../../components/layout'
import Summary from '../../../components/place/summary'

type Props = {
  user: MappedUser
  place: MappedPlace
}

const RequestPage = (props: Props) => {
  const router = useRouter()
  const { t } = useTranslation('common')
  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title.place.request')}</title>
      </Head>
      <Container maxW="7xl">
        <Box mb="5">
          <Button variant="ghost" pl={0} leftIcon={<ArrowBackIcon />} onClick={router.back}>
            {props.place.title}
          </Button>
        </Box>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
          <Box>
            <Summary place={props.place} />
          </Box>
          <Form place={props.place} />
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user == undefined) {
    // Redirect user to login
    return {
      redirect: {
        destination: `/login?place=${context.query.id}`,
        permanent: false,
      },
    }
  }
  if (context.req.session.user.role !== UserRole.GUEST) {
    // Allow only guests to request a stay
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const onboardingSteps = await onboardingCheck(context.req.session.user.id)
  if (onboardingSteps.length > 0) {
    // User needs to do the onboarding first
    return {
      redirect: {
        destination: `/onboarding?place=${context.query.id}`,
        permanent: false,
      },
    }
  }

  const sessionUser = await getSessionUser(context.req.session)

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
  if (place == null || !place.active || place.deleted) {
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
      place: mapPlace(place),
    },
  }
})

export default RequestPage
