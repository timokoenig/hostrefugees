import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Switch,
  Text,
  useToast,
} from '@chakra-ui/react'
import { HostType, Place, UserRole } from '@prisma/client'
import PeopleForm from 'components/dashboard/place/people-form'
import PetsForm from 'components/dashboard/place/pets-form'
import Layout from 'components/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import prisma from 'prisma/client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import { getSessionUser } from 'utils/session-user'

type Props = {
  user: MappedUser
  place: Place
}

const PlacePage = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const toast = useToast()
  const [isLoading, setLoading] = useState<boolean>(false)

  const onUpdate = async (place: Place) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/place/${place.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(place),
      })
      if (res.ok) {
        router.back()
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

  const togglePlaceActive = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/place/${props.place.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          active: !props.place.active,
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
    setLoading(false)
  }

  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title.dashboard.place')}</title>
      </Head>
      <Container maxW="7xl">
        <Box mb="5">
          <Button variant="ghost" pl={0} leftIcon={<ArrowBackIcon />} onClick={router.back}>
            {t('dashboard')}
          </Button>
        </Box>
        <Heading as="h2" size="lg" mb="10">
          {t('place.update')}
        </Heading>
        <SimpleGrid templateColumns={{ sm: '1fr', md: '3fr 1fr' }} spacing={5}>
          <GridItem>
            {/* {props.place.photos.length == 0 && (
              <Alert status="warning" variant="solid" rounded="lg" mb="5">
                <AlertIcon />
                <Text as="span" fontWeight="semibold" mr="1">
                  {t('place.nophoto')}
                </Text>
                - {t('place.nophoto.text')}
              </Alert>
            )} */}
            {props.place.hostType == HostType.PETS ? (
              <PetsForm place={props.place} onChange={onUpdate} isLoading={isLoading} />
            ) : (
              <PeopleForm place={props.place} onChange={onUpdate} isLoading={isLoading} />
            )}
          </GridItem>
          <Box>
            <Box mb="20">
              <Heading size="md" mb="5">
                {t('status')}
              </Heading>
              <Text mb="5">{props.place.active ? t('place.active') : t('place.inactive')}</Text>
              <Switch
                size="lg"
                isChecked={props.place.active}
                onChange={togglePlaceActive}
                isDisabled={isLoading}
              />
            </Box>
            <Box>
              <Heading size="md" mb="5">
                {t('photos')}
              </Heading>
              <SimpleGrid columns={2} spacing="5" mb="5">
                {props.place.photos.map(photo => (
                  <Image
                    key={photo}
                    src={`/api/place/${props.place.id}/photo/${photo}`}
                    alt="place photo"
                    rounded="lg"
                    backgroundColor="gray"
                    h="100"
                  />
                ))}
              </SimpleGrid>
              <Button
                onClick={() => router.push(`/dashboard/place/${props.place.id}/photo`)}
                isFullWidth
                isDisabled={isLoading}
              >
                {t('place.changephotos')}
              </Button>
            </Box>
          </Box>
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
  if (
    place === null ||
    place.deleted ||
    (context.req.session.user.role !== UserRole.ADMIN &&
      place.author.id !== context.req.session.user.id)
  ) {
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
      place,
    },
  }
})

export default PlacePage
