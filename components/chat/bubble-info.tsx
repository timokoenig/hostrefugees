import { Box, Button, Center, Flex, Image, Text } from '@chakra-ui/react'
import { Feature, HostType, Place, Request, User, UserRole } from '@prisma/client'
import parse from 'html-react-parser'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import showTranslation from 'utils/show-translation'

type Props = {
  request: Request & { place: Place; author: User }
  user: MappedUser
  onAccept: () => void
  onDecline: () => void
}

const ChatBubbleInfo = (props: Props) => {
  const { t } = useTranslation('common')
  const { t: tLang } = useTranslation('languages')

  const info = () => {
    if (props.request.place.hostType == HostType.PETS) {
      const arr = ['Pets', '&bull;']
      if (props.request.place.features.includes(Feature.PET_CAT)) {
        arr.push('Cats')
        arr.push('&bull;')
      }
      if (props.request.place.features.includes(Feature.PET_DOG)) {
        arr.push('Dogs')
      }
      return arr.join(' ')
    }

    return [
      props.request.place.rooms,
      t('rooms', { count: props.request.place.rooms }),
      '&bull;',
      props.request.place.beds,
      t('beds', { count: props.request.place.beds }),
    ].join(' ')
  }

  return (
    <Flex mb="10" flexDirection="column">
      <Box
        py="1"
        px="2"
        mb="2"
        // backgroundColor={useColorModeValue('gray.100', 'gray.900')}
        borderRadius="10"
        marginLeft="auto"
        marginRight="auto"
        width={{ base: '90%', md: '70%' }}
      >
        <Box fontWeight="bold" as="h4" lineHeight="tight" isTruncated textAlign="center" mb="2">
          {props.request.place.addressCity}: {props.request.place.title}
        </Box>
        <Box>
          {props.request.place.photos.length == 0 ? (
            <Box rounded="md" backgroundColor="gray" w="100%" h="100%" />
          ) : (
            <Image
              alt="place image"
              src="https://picsum.photos/1000" //{`/api/place/${props.request.place.id}/photo/${props.request.place.photos[0]}`}
              fit="cover"
              align="center"
              rounded="10"
              maxHeight="150"
              width="100%"
            />
          )}
        </Box>
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="11px"
          textTransform="uppercase"
          textAlign="center"
          mt="2"
        >
          {parse(info())}
        </Box>
        <Text fontSize="14">
          {t('adults')}:{' '}
          <Text as="span" fontWeight="semibold">
            {props.request.adults}
          </Text>
        </Text>
        <Text fontSize="14">
          {t('children')}:{' '}
          <Text as="span" fontWeight="semibold">
            {props.request.children}
          </Text>
        </Text>
        <Text fontSize="14">
          {t('pets')}:{' '}
          <Text as="span" fontWeight="semibold">
            {props.request.pets ? t('yes') : t('no')}
          </Text>
        </Text>
        {props.user.role === UserRole.HOST && (
          <Text fontSize="14">
            {t('languages.guest')}:{' '}
            <Text as="span" fontWeight="semibold">
              {props.request.author.languages.map((lang: string) => tLang(lang)).join(', ')}
            </Text>
          </Text>
        )}
        <Text fontWeight="semibold" fontSize="14" mt="4">
          {t('about')}
        </Text>
        <Text fontSize="14">
          {props.request.about.length == 0
            ? 'N/A'
            : showTranslation(props.request.about, props.request.aboutTranslation)}
        </Text>
      </Box>
      {props.request.status == null && props.user.role == UserRole.HOST && (
        <>
          <Center my="2">
            <Button colorScheme="green" mx="2" onClick={props.onAccept}>
              {t('accept')}
            </Button>
            <Button colorScheme="red" mx="2" onClick={props.onDecline}>
              {t('decline')}
            </Button>
          </Center>
          <Center>
            <Text textAlign="center" maxWidth="70%" fontSize="14" color="gray.500">
              {t('chat.info')}
            </Text>
          </Center>
        </>
      )}
    </Flex>
  )
}

export default ChatBubbleInfo
