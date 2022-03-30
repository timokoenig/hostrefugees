import { Badge, Box, Flex, Text } from '@chakra-ui/react'
import { Post } from '@prisma/client'
import moment from 'moment'
import React from 'react'

type Props = {
  post: Post
}

const PostItem = (props: Props) => (
  <Flex>
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
