import { Box, ListItem, useColorModeValue } from '@chakra-ui/react'
import { Post } from '@prisma/client'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  post: Post
}

const PostItem = (props: Props) => {
  const router = useRouter()
  return (
    <ListItem onClick={() => router.push(`/dashboard/post/${props.post.id}`)}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        _hover={{ background: useColorModeValue('gray.100', 'gray.900') }}
      >
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
            >
              {moment(props.post.createdAt).format('DD.MM.YYYY HH:mm')}
            </Box>
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            {props.post.title}
          </Box>
        </Box>
      </Box>
    </ListItem>
  )
}

export default PostItem
