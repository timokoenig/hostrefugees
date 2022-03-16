import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Container, SimpleGrid } from '@chakra-ui/react'
import { UserRole } from '@prisma/client'
import Form from 'components/request/form'
import { useRouter } from 'next/router'
import prisma from 'prisma/client'
import React from 'react'
import { mapPlace } from 'utils/mapper'
import { MappedPlace, MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Layout from '../../../components/layout'
import Summary from '../../../components/place/summary'

type Props = {
  user: MappedUser
  place: MappedPlace
}

const RequestPage = (props: Props) => {
  const router = useRouter()
  return (
    <Layout user={props.user}>
      <Container maxW="7xl">
        <Box mb="5">
          <Button variant="ghost" leftIcon={<ArrowBackIcon />} onClick={router.back}>
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
  if (context.req.session.user === undefined) {
    // Redirect user to login
    return {
      redirect: {
        destination: `/login?place=${context.query.id}`,
        permanent: false,
      },
    }
  }
  if (context.req.session.user?.role !== UserRole.GUEST) {
    // Allow only guests to request a stay
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

  return {
    props: {
      user: context.req.session.user,
      place: mapPlace(place),
    },
  }
})

export default RequestPage
