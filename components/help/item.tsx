/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

type Props = {
  title: string
  children: any
}

const Item = (props: Props) => {
  return (
    <Box mb="5">
      <Heading as="h2" size="md">
        {props.title}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>{props.children}</Text>
    </Box>
  )
}

export default Item
