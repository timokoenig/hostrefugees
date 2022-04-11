import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import { withSessionSsr } from 'utils/session'
import Layout from '../components/layout'

type Props = {
  user?: MappedUser
}

const DocumentsPage = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Layout user={props.user}>
      <Head>
        <title>{t('page.title.documents')}</title>
      </Head>
      <Container maxW="7xl">
        <Center mb="10">
          <Heading as="h1" size="xl">
            {t('documents')}
          </Heading>
        </Center>
        <Center textAlign="center">
          <Box mb="5" maxWidth="2xl">
            <Heading as="h2" size="md" mb="2">
              {t('documents.flyer')}
            </Heading>
            <Text mb="5" color={useColorModeValue('gray.600', 'gray.400')}>
              {t('documents.flyer.desc')}
            </Text>
            <SimpleGrid columns={2} spacing={5}>
              <Image
                src="/docs/BusinessCard_HostRefugees_Front.png"
                rounded="xl"
                alt="HostRefugees Flyer Front"
              />
              <Image
                src="/docs/BusinessCard_HostRefugees_Back.png"
                rounded="xl"
                alt="HostRefugees Flyer Back"
              />
            </SimpleGrid>
            <Button as={Link} my="5" href="/docs/BusinessCard_HostRefugees.pdf" target="_blank">
              {t('documents.flyer.download')}
            </Button>
          </Box>
        </Center>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  return {
    props: {
      user: context.req.session.user ?? null,
    },
  }
})

export default DocumentsPage
