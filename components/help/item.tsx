import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {
  title: string
  text: string
}

const Item = (props: Props) => {
  return (
    <Box mb="5">
      <Heading as="h2" size="md">
        {props.title}
      </Heading>
      <Text>{props.text}</Text>
    </Box>
  )
}

export default Item
