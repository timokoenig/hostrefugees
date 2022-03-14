import { Container, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import Footer from '../components/footer'

const IndexPage = () => {
  return (
    <>
      <Container marginTop={10}>
        <Head>
          <title>HostRefugees</title>
        </Head>
        <Heading>HostRefugees.eu</Heading>
      </Container>
      <Footer />
    </>
  )
}

export default IndexPage
