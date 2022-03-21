import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Switch,
  Text,
} from '@chakra-ui/react'
import { Place, UserRole } from '@prisma/client'
import Layout from 'components/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import prisma from 'prisma/client'
import React from 'react'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Form from '../../../../components/dashboard/place/form'

type Props = {
  user: MappedUser
  place: Place
}

const PlacePage = (props: Props) => {
  const router = useRouter()

  const onUpdate = async (place: Place) => {
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
      }
    } catch (err: unknown) {
      console.log(err)
    }
  }

  const togglePlaceActive = async () => {
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
      }
    } catch (err: unknown) {
      console.log(err)
    }
  }

  return (
    <Layout user={props.user}>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Container maxW="7xl">
        <Box mb="5">
          <Button variant="ghost" pl={0} leftIcon={<ArrowBackIcon />} onClick={router.back}>
            Dashboard
          </Button>
        </Box>
        <Heading as="h2" size="lg" mb="10">
          Update Place
        </Heading>
        <SimpleGrid templateColumns={{ sm: '1fr', md: '3fr 1fr' }} spacing={5}>
          <GridItem>
            {props.place.photos.length == 0 && (
              <Alert status="warning" variant="solid" rounded="lg" mb="5">
                <AlertIcon />
                <Text as="span" fontWeight="semibold" mr="1">
                  Missing Photo
                </Text>
                - You need to upload at least one photo to make this place available for guests.
              </Alert>
            )}
            <Form place={props.place} onChange={onUpdate} />
          </GridItem>
          <Box>
            <Box mb="20">
              <Heading size="md" mb="5">
                Status
              </Heading>
              <Text mb="5">
                {props.place.active ? 'Your place is active' : 'Click to activate your place'}
              </Text>
              <Switch size="lg" isChecked={props.place.active} onChange={togglePlaceActive} />
            </Box>
            <Box>
              <Heading size="md" mb="5">
                Photos
              </Heading>
              <SimpleGrid columns={2} spacing="5" mb="5">
                {props.place.photos.map(photo => (
                  <Image
                    key={photo}
                    src={`/api/place/${props.place.id}/photo/${photo}`}
                    rounded="lg"
                    backgroundColor="gray"
                    h="100"
                  />
                ))}
              </SimpleGrid>
              <Button
                onClick={() => router.push(`/dashboard/place/${props.place.id}/photo`)}
                isFullWidth
              >
                Change Photos
              </Button>
            </Box>
          </Box>
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

export default PlacePage
