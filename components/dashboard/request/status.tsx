import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

type Props = {
  title: string
  color: string
  children: JSX.Element | JSX.Element[]
}

const Status = (props: Props): JSX.Element => (
  <Box backgroundColor={props.color} rounded="xl" textAlign="center" p="5" color="white">
    <Heading size="sm" mb="2">
      {props.title}
    </Heading>
    {props.children}
  </Box>
)

export default Status
