import { Text } from '@chakra-ui/react'
import Layout from 'components/layout'
import Spacer from 'components/spacer'
import Head from 'next/head'
import React from 'react'
import { User } from 'utils/model'
import { withSessionSsr } from 'utils/session'
import Footer from '../components/footer'
import Navigation from '../components/navigation'

type Props = {
  user?: User
}

const ProfilePage = (props: Props) => {
  return (
    <>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Layout>
        <Navigation user={props.user} />
        <Text>Profile</Text>
        <Spacer />
        <Footer />
      </Layout>
    </>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  if (context.req.session.user === undefined) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      user: context.req.session.user ?? null,
    },
  }
})

export default ProfilePage
