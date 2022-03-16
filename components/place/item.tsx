import { Box, GridItem, Image, ListItem, SimpleGrid } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import { MappedPlace } from 'utils/models'

type Props = {
  place: MappedPlace
  onClick?: () => void
}

const PlaceItem = (props: Props) => {
  const router = useRouter()
  return (
    <ListItem onClick={props.onClick ?? (() => router.push(`/place/${props.place.id}`))}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        _hover={{ background: 'gray.100' }}
      >
        <SimpleGrid columns={4}>
          <GridItem>
            <Image
              rounded="md"
              alt="product image"
              src="https://picsum.photos/900/600"
              fit="cover"
              align="center"
              w="100%"
              h="100%"
            />
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
          </GridItem>
        </SimpleGrid>
      </Box>
    </ListItem>
  )
}

export default PlaceItem
