/* eslint-disable no-empty */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-for-in-array */
import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Image,
  Input,
  SimpleGrid,
} from '@chakra-ui/react'
import { User, UserRole } from '@prisma/client'
import Layout from 'components/layout'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'
import prisma from 'prisma/client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import sharp from 'sharp'
import { readFile, S3_BUCKET_DOCUMENT, S3_BUCKET_USER } from 'utils/aws/s3'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'

type Props = {
  user: MappedUser
  selectedUser: User
  documents: string[]
  photo: string
}

const UserPage = (props: Props) => {
  const { t } = useTranslation('common')
  const { t: tLang } = useTranslation('languages')
  const router = useRouter()

  const onVerify = async () => {
    const res = await fetch(`/api/user/${props.selectedUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        verified: true,
      }),
    })
    if (res.ok) {
      router.reload()
    }
  }

  return (
    <Layout user={props.user}>
      <Head>
        <title>HostRefugees - Admin User</title>
      </Head>
      <Container maxW="7xl">
        <Box mb="5">
          <Button
            pl="0"
            variant="ghost"
            leftIcon={<ArrowBackIcon />}
            onClick={() => router.push('/dashboard/admin/user')}
          >
            Users
          </Button>
        </Box>
        <Heading as="h2" size="xl" mb="5">
          {props.selectedUser.role == UserRole.GUEST ? t('guest') : t('host')}
        </Heading>
        <SimpleGrid templateColumns={{ sm: '1fr', md: '3fr 1fr' }} spacing="10">
          <GridItem>
            <FormControl mb="5">
              <FormLabel htmlFor="firstname">{t('firstname')}</FormLabel>
              <Input
                id="firstname"
                type="firstname"
                value={props.selectedUser.firstname}
                isDisabled={true}
              />
            </FormControl>
            <FormControl mb="5">
              <FormLabel htmlFor="lastname">{t('lastname')}</FormLabel>
              <Input
                id="lastname"
                type="lastname"
                value={props.selectedUser.lastname}
                isDisabled={true}
              />
            </FormControl>
            <FormControl mb="5">
              <FormLabel htmlFor="email">{t('email')}</FormLabel>
              <Input id="email" type="email" value={props.selectedUser.email} isDisabled={true} />
            </FormControl>
            <FormControl mb="5">
              <FormLabel htmlFor="languages">{t('languages')}</FormLabel>
              <Input
                id="languages"
                type="languages"
                value={props.selectedUser.languages.map(lang => tLang(lang)).join(', ')}
                isDisabled={true}
              />
            </FormControl>
            <FormControl mb="5">
              <FormLabel htmlFor="createdAt">Joined</FormLabel>
              <Input
                id="createdAt"
                type="createdAt"
                value={moment(props.selectedUser.createdAt).format('DD.MM.YYYY')}
                isDisabled={true}
              />
            </FormControl>
            <FormControl mb="5">
              <FormLabel htmlFor="documents">Documents ({props.documents.length})</FormLabel>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
                {props.documents.map((doc, i) => (
                  <Image key={i} src={doc} />
                ))}
              </SimpleGrid>
            </FormControl>
          </GridItem>
          <GridItem>
            <Box mb="10">
              <Heading size="md" mb="5">
                Photo
              </Heading>
              <Avatar size="2xl" src={props.photo} />
            </Box>
            {props.selectedUser.role == UserRole.HOST && (
              <Box>
                <Heading size="md" mb="5">
                  Verification
                </Heading>
                {props.selectedUser.verified ? (
                  <Badge colorScheme="green">User is verified</Badge>
                ) : (
                  <Button onClick={onVerify}>Click to approve</Button>
                )}
              </Box>
            )}
          </GridItem>
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user == undefined || context.req.session.user.role != UserRole.ADMIN) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      id: context.query.id as string,
    },
  })
  if (user == null) {
    return {
      redirect: {
        destination: '/dashboard/admin',
        permanent: false,
      },
    }
  }

  const verificationDocuments = ['front', 'back', 'selfie']
  const documents: string[] = []
  for (let i = 0; i < verificationDocuments.length; i++) {
    try {
      const file = await readFile(`${user.id}/${verificationDocuments[i]}`, S3_BUCKET_DOCUMENT)
      const resizedFile = await sharp(file.data).resize(300).toBuffer()
      documents.push(`data:${file.contentType};base64, ${resizedFile.toString('base64')}`)
    } catch {}
  }

  let photo = ''
  try {
    const file = await readFile(user.id, S3_BUCKET_USER)
    const resizedFile = await sharp(file.data).resize(300).toBuffer()
    photo = `data:${file.contentType};base64, ${resizedFile.toString('base64')}`
  } catch {}

  return {
    props: {
      user: context.req.session.user,
      selectedUser: user,
      documents,
      photo,
    },
  }
})

export default UserPage
