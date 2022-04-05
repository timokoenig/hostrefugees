import { Box, Image } from '@chakra-ui/react'
import moment from 'moment-timezone'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MappedPlace } from 'utils/models'

type Props = {
  place: MappedPlace
}

const Summary = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
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
          h="300px"
        />
      )}
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            {props.place.rooms} {t('rooms', { count: props.place.rooms })} &bull; {props.place.beds}{' '}
            {t('beds', { count: props.place.beds })}
          </Box>
        </Box>
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {props.place.addressCity}: {props.place.title}
        </Box>
        <Box>
          {moment(props.place.availabilityStart).isBefore(moment())
            ? t('availablenow')
            : moment(props.place.availabilityStart).format('DD.MM.YYYY')}
        </Box>
      </Box>
    </Box>
  )
}

export default Summary
