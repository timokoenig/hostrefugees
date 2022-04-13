import { Container, Flex, GridItem, Icon, Image, SimpleGrid } from '@chakra-ui/react'
import { HostType, Request } from '@prisma/client'
import React from 'react'
import { BsHouse } from 'react-icons/bs'
import { FaDog } from 'react-icons/fa'
import { MappedPlace } from 'utils/models'
import DetailPeople from './detail-people'
import DetailPets from './detail-pets'

type Props = {
  place: MappedPlace
  request: Request | null
  enableRequest: boolean
}

export default function Detail(props: Props) {
  return (
    <Container maxW="7xl">
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }}>
        <SimpleGrid columns={2} spacing="5">
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
            props.place.photos.map((photo, i) => (
              <GridItem key={i} colSpan={i == 0 ? 2 : 1}>
                <Image
                  rounded="md"
                  alt="place image"
                  src={`/api/place/${props.place.id}/photo/${photo}?width=1000&height=1000`}
                  fit="cover"
                  align="center"
                  w="100%"
                  h={{ base: '100%', sm: '400px', lg: '500px' }}
                  loading="lazy"
                />
              </GridItem>
            ))
          )}
        </SimpleGrid>
        {props.place.hostType == HostType.PETS ? (
          <DetailPets
            place={props.place}
            request={props.request}
            enableRequest={props.enableRequest}
          />
        ) : (
          <DetailPeople
            place={props.place}
            request={props.request}
            enableRequest={props.enableRequest}
          />
        )}
      </SimpleGrid>
    </Container>
  )
}
