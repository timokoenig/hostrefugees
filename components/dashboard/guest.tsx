import { Box, Container, Flex, Heading, List, Stack } from '@chakra-ui/react'
import React from 'react'
import { Request } from '../../utils/model'
import RequestItem from './request-item'

type Props = {
  requests: Request[]
}

const Guest = (props: Props) => {
  return (
    <Container maxW="7xl" py={10}>
      <Box>
        <Flex mb="5" textAlign="center">
          <Heading size="md">Your Requests</Heading>
        </Flex>
        <Stack spacing={6}>
          <List spacing="2">
            {props.requests.map((request, i) => (
              <RequestItem key={i} request={request} />
            ))}
          </List>
        </Stack>
      </Box>
    </Container>
  )
}

export default Guest
