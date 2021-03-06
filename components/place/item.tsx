import {
  Box,
  Flex,
  GridItem,
  Icon,
  Image,
  ListItem,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react'
import { Feature, HostType } from '@prisma/client'
import parse from 'html-react-parser'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BsHouse } from 'react-icons/bs'
import { FaDog } from 'react-icons/fa'
import { formatAvailability } from 'utils/formatter'
import { MappedPlace } from 'utils/models'
import showTranslation from 'utils/show-translation'

type Props = {
  place: MappedPlace
  onClick?: () => void
}

const PlaceItem = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()

  const info = () => {
    if (props.place.hostType == HostType.PETS) {
      const arr = ['Pets', '&bull;']
      if (props.place.features.includes(Feature.PET_CAT)) {
        arr.push('Cats')
        arr.push('&bull;')
      }
      if (props.place.features.includes(Feature.PET_DOG)) {
        arr.push('Dogs')
      }
      return arr.join(' ')
    }

    return [
      props.place.rooms,
      t('rooms', { count: props.place.rooms }),
      '&bull;',
      props.place.beds,
      t('beds', { count: props.place.beds }),
    ].join(' ')
  }

  return (
    <ListItem onClick={props.onClick ?? (() => router.push(`/place/${props.place.id}`))}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        _hover={{ background: useColorModeValue('gray.100', 'gray.900') }}
      >
        <SimpleGrid columns={4}>
          <GridItem>
            {props.place.photos.length == 0 ? (
              <Flex rounded="md" w="100%" h="100%" align="center" justify="center">
                <Icon
                  as={props.place.hostType == HostType.PETS ? FaDog : BsHouse}
                  w="16"
                  h="16"
                  color="blue.500"
                />
              </Flex>
            ) : (
              <Image
                rounded="md"
                alt="place image"
                src={`/api/place/${props.place.id}/photo/${props.place.photos[0]}?width=300&height=300`}
                fit="cover"
                align="center"
                w="100%"
                h="100%"
                maxH="130"
                loading="lazy"
              />
            )}
          </GridItem>
          <GridItem colSpan={3} p="6">
            <Box display="flex" alignItems="baseline">
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
              >
                {parse(info())}
              </Box>
            </Box>
            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
              {props.place.addressCity}:{' '}
              {showTranslation(props.place.title, props.place.titleTranslation)}
            </Box>
            <Box>{formatAvailability(t, props.place)}</Box>
          </GridItem>
        </SimpleGrid>
      </Box>
    </ListItem>
  )
}

export default PlaceItem
