import { Box, Container, Flex, Heading, List, Stack } from '@chakra-ui/react'
import React from 'react'
import RequestItem from './request-item'

const Guest = () => {
  const places = [1, 2, 3, 4]
  return (
    <Container maxW="7xl" py={10}>
      <Box>
        <Flex mb="5" textAlign="center">
          <Heading size="md">Your Requests</Heading>
        </Flex>
        <Stack spacing={6}>
          <List spacing="2">
            {places.map((_, i) => (
              <RequestItem key={i} />
            ))}
          </List>
        </Stack>
      </Box>
    </Container>
  )
}

export default Guest
