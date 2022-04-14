import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Container } from '@chakra-ui/react'
import Layout from 'components/layout'
import VerificationForm from 'components/profile/verification'
import Head from 'next/head'
import { useRouter } from 'next/router'
import prisma from 'prisma/client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { mapUser } from 'utils/mapper'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'

type Props = {
  user: MappedUser & {
    verified: boolean
  }
}

const VerificationPage = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title.profile.verification')}</title>
      </Head>
      <Container maxW="7xl">
        <Box mb="5">
          <Button variant="ghost" pl={0} leftIcon={<ArrowBackIcon />} onClick={router.back}>
            {t('profile')}
          </Button>
        </Box>
        <VerificationForm user={props.user} />
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

  const user = await prisma.user.findUnique({
    where: {
      id: context.req.session.user.id,
    },
  })
  if (user == null) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: {
        ...mapUser(user),
        verified: user.verified,
        verificationSubmitted: user.verificationSubmittedAt != null,
      },
    },
  }
})

export default VerificationPage
