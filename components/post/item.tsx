import { Box, Heading, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { Post } from '@prisma/client'
import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  post: Post
}

const PostItem = (props: Props) => {
  const { t } = useTranslation('common')

  return (
    <Box
      w="100%"
      borderRadius="xl"
      mb={2}
      d="inline-block"
      bg={useColorModeValue('gray.100', 'gray.700')}
      boxShadow="lg"
      p={4}
    >
      <Heading as="h3" size="md" fontWeight="semibold" mb="2">
        {props.post.title}
      </Heading>
      <Text mb="5">{props.post.description}</Text>
      {props.post.addressCity && (
        <Text mb="5">
          {props.post.addressStreet} {props.post.addressHouseNumber}
          <br />
          {props.post.addressZip} {props.post.addressCity}
          <br />
        </Text>
      )}
      {props.post.website && (
        <Text mb="5">
          {t('website')}{' '}
          <Link href={props.post.website} color="blue.500" isExternal>
            {props.post.website}
          </Link>
        </Text>
      )}
      {props.post.phoneNumber && (
        <Text mb="5">
          {t('phone')}{' '}
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
