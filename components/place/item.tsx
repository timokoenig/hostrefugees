import { Box, GridItem, Image, ListItem, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
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
              <Box rounded="md" backgroundColor="gray" w="100%" h="100%" />
            ) : (
              <Image
                rounded="md"
                alt="place image"
                src={`/api/place/${props.place.id}/photo/${props.place.photos[0]}`}
                fit="cover"
                align="center"
                w="100%"
                h="100%"
                maxH="130"
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
                {props.place.rooms} {t('rooms')} &bull; {props.place.beds} {t('beds')}
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
