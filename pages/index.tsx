import { Container, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'

const IndexPage = () => {
  return (
    <Container marginTop={10}>
      <Head>
        <title>HostRefugees</title>
      </Head>
      <Heading>HostRefugees.eu</Heading>
    </Container>
  )
}

export default IndexPage
