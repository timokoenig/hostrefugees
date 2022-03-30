import { Badge, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { Post } from '@prisma/client'
import moment from 'moment'
import React from 'react'

type Props = {
  post: Post
  onClick: () => void
}

const PostItem = (props: Props) => (
  <Flex
    cursor="pointer"
    _hover={{ background: useColorModeValue('gray.100', 'gray.900') }}
    py="5"
    rounded="10"
    onClick={props.onClick}
  >
    <Box>
      <Text fontWeight="bold">
        {props.post.title}
        <Badge ml="1" colorScheme="green">
          New
        </Badge>
      </Text>
      <Text fontSize="sm">{moment(props.post.createdAt).format('DD.MM.YYYY')}</Text>
    </Box>
  </Flex>
)

export default PostItem
