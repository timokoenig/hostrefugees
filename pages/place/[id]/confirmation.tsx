import {
  Button,
  Center,
  Container,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Layout from '../../../components/layout'

type Props = {
  user: MappedUser
}

const RequestPage = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title.place.confirmation')}</title>
      </Head>
      <Container maxW="7xl" textAlign="center" maxWidth="700">
        <Center>
          <Image src="/svg/undraw_completing_re_i7ap.svg" maxWidth="250" />
        </Center>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          {t('request.title')}
        </Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>{t('request.info')}</Text>
        <Button my="10" onClick={() => router.push('/')}>
          {t('request.starterkit')}
        </Button>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>or</Text>

        <Button my="10" onClick={() => router.push('/dashboard')}>
          {t('request.dashboard')}
        </Button>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user == undefined) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    }
  }
  return {
    props: {
      user: context.req.session.user,
    },
  }
})

export default RequestPage
