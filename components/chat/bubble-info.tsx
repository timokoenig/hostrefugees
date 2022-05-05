import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

const ChatBubbleInfo = (props: Props) => {
  return (
    <Flex mb="2">
      <Box
        py="1"
        px="2"
        backgroundColor="gray.900"
        borderRadius="10"
        marginLeft="auto"
        marginRight="auto"
      >
        {typeof props.children == 'string' ? (
          <Text wordBreak="break-word">{props.children}</Text>
        ) : (
          props.children
        )}
      </Box>
    </Flex>
  )
}

export default ChatBubbleInfo
