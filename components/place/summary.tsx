import { Box, Image } from '@chakra-ui/react'
import moment from 'moment-timezone'
import React from 'react'
import { Place } from 'utils/model'

type Props = {
  place: Place
}

const Summary = (props: Props) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image
        rounded="md"
        alt="product image"
        src="https://picsum.photos/900/600"
        fit="cover"
        align="center"
        w="100%"
        h="300px"
      />
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            {props.place.rooms} rooms &bull; {props.place.beds} beds
          </Box>
        </Box>
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {props.place.addressCity}: {props.place.title}
        </Box>
        <Box>
          {moment(props.place.availabilityStart).isBefore(moment())
            ? 'Available Now'
            : moment(props.place.availabilityStart).format('DD.MM.YYYY')}
        </Box>
      </Box>
    </Box>
  )
}

export default Summary
