import { Box, Heading, Icon, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { Post } from '@prisma/client'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoOpenOutline } from 'react-icons/io5'
import { formatUrl } from 'utils/formatter'
import showTranslation, { isOrignal } from 'utils/show-translation'
import Category from './category'

const TranslationButton = (props: { showOrignal: boolean; onClick: () => void }) => {
  const { t } = useTranslation('common')
  return (
    <Text
      as="span"
      color="gray.400"
      fontSize="xs"
      _hover={{ color: 'gray.300' }}
      onClick={e => {
        e.stopPropagation()
        props.onClick()
      }}
    >
      ({props.showOrignal ? t('translate.translation') : t('translate.original')})
    </Text>
  )
}

type Props = {
  post: Post
  active: boolean
}

const PostItem = (props: Props) => {
  const router = useRouter()
  const backgroundColor = useColorModeValue('gray.100', 'gray.700')
  const backgroundColorActive = useColorModeValue('blue.100', 'blue.700')
  const dateColor = useColorModeValue('gray.400', 'gray.600')
  const [showOriginal, setShowOriginal] = useState<boolean>(false)

  const onClick = async () => {
    await router.push(router.query.id == props.post.id ? '/post' : `/post/${props.post.id}`)
  }

  return (
    <Box
      w="100%"
      borderRadius="xl"
      mb={2}
      d="inline-block"
      bg={props.active ? backgroundColorActive : backgroundColor}
      boxShadow="lg"
      cursor="pointer"
      onClick={onClick}
      p={4}
    >
      <Heading as="h3" size="md" fontWeight="semibold" mb="2">
        {showOriginal
          ? props.post.title
          : showTranslation(props.post.title, props.post.titleTranslation)}
      </Heading>
      {props.post.category.length > 0 && (
        <Box mb="2">
          {props.post.category.map(cat => (
            <Category key={cat} category={cat} />
          ))}
        </Box>
      )}
      <Text mb="5">
        {showOriginal
          ? props.post.description
          : showTranslation(props.post.description, props.post.descriptionTranslation)}{' '}
        {!isOrignal(props.post.descriptionTranslation) && (
          <TranslationButton
            showOrignal={showOriginal}
            onClick={() => setShowOriginal(!showOriginal)}
          />
        )}
      </Text>
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
      <Text fontSize="xs" color={props.active ? 'white' : dateColor} textAlign="right">
        {moment(props.post.createdAt).format('DD.MM.YYYY')}
      </Text>
    </Box>
  )
}
export default PostItem
