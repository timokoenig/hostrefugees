import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { Place, UserRole } from '@prisma/client'
import Layout from 'components/layout'
import VerificationButton from 'components/onboarding/verification-button'
import Head from 'next/head'
import { useRouter } from 'next/router'
import prisma from 'prisma/client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'

type Props = {
  user: MappedUser
  place: Place
}

const getPhotos = (place: Place): string[] => {
  const photos: string[] = place.photos
  const count = 3 - place.photos.length
  for (let i = 0; i < count; i++) {
    photos.push('')
  }
  return photos
}

const PhotoPage = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [photos, setPhotos] = useState<string[]>(getPhotos(props.place))

  const uploadPhoto = async (file: File | null): Promise<string> => {
    setLoading(true)
    const body = new FormData()
    if (file !== null) {
      body.append('file', file)
    }
    const res = await fetch(`/api/place/${props.place.id}/photo`, { method: 'POST', body })
    setLoading(false)
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    if (res.body == null) {
      throw new Error('No Response')
    }
    const json = (await res.json()) as { id: string }
    return json.id
  }

  const deletePhoto = async (id: string) => {
    setLoading(true)
    await fetch(`/api/place/${props.place.id}/photo/${id}`, { method: 'DELETE' })
    setLoading(false)
  }

  const photoURL = (photo: string): string | null => {
    if (photo == '') return null
    return `/api/place/${props.place.id}/photo/${photo}`
  }

  return (
    <Layout user={props.user}>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Container maxW="7xl">
        <Box mb="5">
          <Button variant="ghost" pl={0} leftIcon={<ArrowBackIcon />} onClick={router.back}>
            {props.place.title}
          </Button>
        </Box>
        <Heading as="h2" size="lg" mb="5">
          {t('place.changephotos')}
        </Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')} mb="10">
          {t('place.changephotos.info')}
        </Text>
        <SimpleGrid templateColumns={{ sm: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }} spacing={10}>
          <VerificationButton
            image={photoURL(photos[0])}
            title={photos[0] == '' ? t('place.uploadphoto') : ''}
            isDisabled={isLoading}
            onUpload={async file => {
              const id = await uploadPhoto(file)
              const newPhotos = [...photos]
              newPhotos[0] = id
              setPhotos(newPhotos)
            }}
            onRemove={async () => {
              await deletePhoto(photos[0])
              const newPhotos = [...photos]
              newPhotos[0] = ''
              setPhotos(newPhotos)
            }}
          />
          <VerificationButton
            image={photoURL(photos[1])}
            title={photos[1] == '' ? t('place.uploadphoto') : ''}
            isDisabled={isLoading}
            onUpload={async file => {
              const id = await uploadPhoto(file)
              const newPhotos = [...photos]
              newPhotos[1] = id
              setPhotos(newPhotos)
            }}
            onRemove={async () => {
              await deletePhoto(photos[1])
              const newPhotos = [...photos]
              newPhotos[1] = ''
              setPhotos(newPhotos)
            }}
          />
          <VerificationButton
            image={photoURL(photos[2])}
            title={photos[2] == '' ? t('place.uploadphoto') : ''}
            isDisabled={isLoading}
            onUpload={async file => {
              const id = await uploadPhoto(file)
              const newPhotos = [...photos]
              newPhotos[2] = id
              setPhotos(newPhotos)
            }}
            onRemove={async () => {
              await deletePhoto(photos[2])
              const newPhotos = [...photos]
              newPhotos[2] = ''
              setPhotos(newPhotos)
            }}
          />
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user === undefined || context.req.session.user?.role === UserRole.GUEST) {
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
    (context.req.session.user?.role !== UserRole.ADMIN &&
      place.author.id !== context.req.session.user?.id)
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
      place,
    },
  }
})

export default PhotoPage
