/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

type Props = {
  children: string | JSX.Element | JSX.Element[]
  position: 'left' | 'right'
}

const ChatBubble = (props: Props) => {
  const alignLeft = props.position == 'left'
  const alignRight = props.position == 'right'

  let tailBefore: any = {
    right: '-7px',
    borderBottomLeftRadius: '16px 14px',
  }
  let tailAfter: any = {
    right: '-26px',
    borderBottomLeftRadius: '10px',
  }
  if (alignLeft) {
    tailBefore = {
      left: '-7px',
      borderBottomRightRadius: '16px',
    }
    tailAfter = {
      left: '-26px',
      borderBottomRightRadius: '10px',
    }
  }

  return (
    <Flex
      flexDirection="row"
      paddingLeft={alignRight ? '5' : undefined}
      paddingRight={alignLeft ? '5' : undefined}
      mb="2"
    >
      <Box
        backgroundColor={alignLeft ? 'gray.100' : 'blue.500'}
        position="relative"
        marginLeft={alignRight ? 'auto' : undefined}
        marginRight={alignLeft ? 'auto' : undefined}
        py="1"
        px="2"
        borderRadius="10"
        _before={{
          content: '""',
          position: 'absolute',
          bottom: '0',
          height: '20px',
          width: '20px',
          backgroundColor: alignLeft ? 'gray.200' : 'blue.500',
          ...tailBefore,
        }}
        _after={{
          content: '""',
          position: 'absolute',
          bottom: '0',
          height: '20px',
          width: '26px',
          backgroundColor: useColorModeValue('white', 'gray.800'),
          ...tailAfter,
        }}
      >
        <Box position="relative" zIndex="10">
          {typeof props.children == 'string' ? (
            <Text wordBreak="break-word" color={alignLeft ? 'gray.700' : 'white'} fontSize="14">
              {props.children}
            </Text>
          ) : (
            props.children
          )}
        </Box>
      </Box>

      <Box />
    </Flex>
  )
}

export default ChatBubble
