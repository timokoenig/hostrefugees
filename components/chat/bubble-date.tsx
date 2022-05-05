import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'

type Props = {
  date: Date
}

const ChatBubbleDate = (props: Props) => {
  return (
    <Flex mb="4" position="relative">
      <Box flex="1" height="1px" backgroundColor={useColorModeValue('gray.300', 'gray.700')} />
      <Box position="absolute" top="-12px" textAlign="center" width="100%">
        <Text
          display="inline"
          backgroundColor={useColorModeValue('white', 'gray.800')}
          marginLeft="auto"
          marginRight="auto"
          px="2"
          borderRadius="5"
          fontSize="12"
          color="gray.500"
        >
          {moment(props.date).format('DD.MM.YYYY HH:mm')}
        </Text>
      </Box>
    </Flex>
  )
}

export default ChatBubbleDate
