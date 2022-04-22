import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Container, GridItem, Heading, SimpleGrid, useToast } from '@chakra-ui/react'
import { Place, UserRole } from '@prisma/client'
import FormSelection from 'components/dashboard/place/form-selection'
import Layout from 'components/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import { getSessionUser } from 'utils/session-user'

type Props = {
  user: MappedUser
}

const NewPage = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const toast = useToast()
  const [isLoading, setLoading] = useState<boolean>(false)

  const onCreate = async (place: Place) => {
    setLoading(true)
    try {
      const res = await fetch('/api/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(place),
      })
      if (res.ok) {
        const json = (await res.json()) as { id: string }
        await router.replace(`/dashboard/place/${json.id}`)
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
        <title>{t('page.title.dashboard.place.new')}</title>
      </Head>
      <Container maxW="7xl">
        <Box mb="5">
          <Button variant="ghost" pl={0} leftIcon={<ArrowBackIcon />} onClick={router.back}>
            {t('dashboard')}
          </Button>
        </Box>
        <Heading as="h2" size="lg" mb="10">
          {t('place.new')}
        </Heading>
        <SimpleGrid templateColumns={{ sm: '1fr', md: '3fr 1fr' }} spacing={5}>
          <GridItem>
            <FormSelection onChange={onCreate} isLoading={isLoading} />
          </GridItem>
          <Box />
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user == undefined || context.req.session.user.role === UserRole.GUEST) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionUser = await getSessionUser(context.req.session)

  return {
    props: {
      user: sessionUser,
    },
  }
})

export default NewPage
