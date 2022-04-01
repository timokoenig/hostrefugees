import { Box, Heading, Icon, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { Post } from '@prisma/client'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import { IoOpenOutline } from 'react-icons/io5'
import { formatUrl } from 'utils/formatter'
import Category from './category'

type Props = {
  post: Post
  active: boolean
}

const PostItem = (props: Props) => {
  const router = useRouter()
  const backgroundColor = useColorModeValue('gray.100', 'gray.700')
  const backgroundColorActive = useColorModeValue('blue.100', 'blue.700')

  return (
    <Box
      w="100%"
      borderRadius="xl"
      mb={2}
      d="inline-block"
      bg={props.active ? backgroundColorActive : backgroundColor}
      boxShadow="lg"
      cursor="pointer"
      onClick={() => router.push(`/post?id=${props.post.id}`, undefined, { shallow: true })}
      p={4}
    >
      <Heading as="h3" size="md" fontWeight="semibold" mb="2">
        {props.post.title}
      </Heading>
      {props.post.category.length > 0 && (
        <Box mb="2">
          {props.post.category.map(cat => (
            <Category key={cat} category={cat} />
          ))}
        </Box>
      )}
      <Text mb="5">{props.post.description}</Text>
      {props.post.addressCity && (
        <Text mb="5">
          {props.post.addressStreet && (
            <>
              {props.post.addressStreet} {props.post.addressHouseNumber}
              <br />
            </>
          )}
          {props.post.addressZip} {props.post.addressCity}
          <br />
        </Text>
      )}
      {props.post.website && (
        <Text mb="2">
          <Link href={props.post.website} color="blue.500" isExternal>
            {formatUrl(props.post.website)} <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
          </Link>
        </Text>
      )}
      {props.post.phoneNumber && (
        <Text mb="2">
          <Link href={`tel:${props.post.phoneNumber}`} color="blue.500" isExternal>
            {props.post.phoneNumber}
          </Link>
        </Text>
      )}
      <Text fontSize="xs" color={useColorModeValue('gray.400', 'gray.600')} textAlign="right">
        {moment(props.post.createdAt).format('DD.MM.YYYY')}
      </Text>
    </Box>
  )
}
export default PostItem
