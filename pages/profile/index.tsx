/* eslint-disable no-empty */
import {
  Badge,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Switch,
  Text,
} from '@chakra-ui/react'
import Layout from 'components/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import prisma from 'prisma/client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useColorMode from 'utils/color-mode'
import { mapUser } from 'utils/mapper'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'

type Props = {
  user: MappedUser & {
    lastname: string
    email: string
    verified: boolean
    verificationSubmitted: boolean
    waitlist: boolean
  }
}

const ProfilePage = (props: Props) => {
  const { t } = useTranslation('common')
  const { t: tLang } = useTranslation('languages')
  const { toggleColorMode, newColorMode } = useColorMode()
  const router = useRouter()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [firstname, setFirstname] = useState<string>(props.user.firstname)
  const [lastname, setLastname] = useState<string>(props.user.lastname)
  const [waitlist, setWaitlist] = useState<boolean>(props.user.waitlist)

  const toggleWaitlist = async () => {
    if (isLoading) return
    setLoading(true)
    try {
      const res = await fetch(`/api/user/${props.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ waitlist: !waitlist }),
      })
      if (!res.ok) throw new Error(res.statusText)
      setWaitlist(!waitlist)
    } catch {}
    setLoading(false)
  }

  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title.profile')}</title>
      </Head>
      <Container maxW="7xl">
        <Heading as="h2" size="xl" mb="5">
          {t('profile')}
        </Heading>
        <SimpleGrid templateColumns={{ sm: '1fr', md: '3fr 1fr' }} spacing="10">
          <GridItem>
            <FormControl mb="5">
              <FormLabel htmlFor="firstname">{t('firstname')}</FormLabel>
              <Input
                id="firstname"
                type="firstname"
                value={firstname}
                isDisabled={true}
                onChange={e => setFirstname(e.target.value)}
              />
            </FormControl>
            <FormControl mb="5">
              <FormLabel htmlFor="lastname">{t('lastname')}</FormLabel>
              <Input
                id="lastname"
                type="lastname"
                value={lastname}
                isDisabled={true}
                onChange={e => setLastname(e.target.value)}
              />
            </FormControl>
            <FormControl mb="5">
              <FormLabel htmlFor="email">{t('email')}</FormLabel>
              <Input id="email" type="email" value={props.user.email} isDisabled={true} />
            </FormControl>
            <FormControl mb="5">
              <FormLabel htmlFor="languages">{t('languages')}</FormLabel>
              <Input
                id="languages"
                type="languages"
                value={props.user.languages.map(lang => tLang(lang)).join(', ')}
                isDisabled={true}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <Box mb="20">
              <Heading size="md" mb="5">
                {t('waitlist')}
              </Heading>
              <Text mb="5">{t('waitlist.text')}</Text>
              <Switch size="lg" isChecked={waitlist} onChange={toggleWaitlist} />
            </Box>
            <Box mb="20">
              <Heading size="md" mb="5">
                {t('profile.verification')}
              </Heading>
              {props.user.verified ? (
                <Badge fontSize="sm" colorScheme="green">
                  {t('verified')}
                </Badge>
              ) : props.user.verificationSubmitted ? (
                <Badge fontSize="sm" colorScheme="yellow">
                  {t('verified.awaiting')}
                </Badge>
              ) : (
                <Button onClick={() => router.push('/profile/verification')}>
                  {t('profile.verification.verify')}
                </Button>
              )}
            </Box>
            <Box>
              <Heading size="md" mb="5">
                {t('profile.appearance')}
              </Heading>
              <Text mb="5">{t('profile.appearance.text')}</Text>
              <Switch size="lg" isChecked={newColorMode == 'light'} onChange={toggleColorMode} />
            </Box>
          </GridItem>
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
        lastname: user.lastname,
        email: user.email,
        verified: user.verified,
        verificationSubmitted: user.verificationSubmittedAt != null,
        waitlist: user.waitlist,
      },
    },
  }
})

export default ProfilePage
