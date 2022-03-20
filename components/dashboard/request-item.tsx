/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Badge, Box, ListItem, useColorModeValue } from '@chakra-ui/react'
import { Request, RequestStatus } from '@prisma/client'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  request: Request
}

const StatusBadge = (props: { status: RequestStatus | null }): JSX.Element => {
  if (props.status === RequestStatus.ACCEPTED) {
    return (
      <Badge colorScheme="green" borderRadius="full" px="2" ml="2">
        Accepted
      </Badge>
    )
  }
  if (props.status === RequestStatus.DECLINED) {
    return (
      <Badge colorScheme="red" borderRadius="full" px="2" ml="2">
        Declined
      </Badge>
    )
  }
  if (props.status === RequestStatus.CANCELED) {
    return (
      <Badge colorScheme="gray" borderRadius="full" px="2" ml="2">
        Canceled
      </Badge>
    )
  }
  return (
    <Badge colorScheme="yellow" borderRadius="full" px="2" ml="2">
      Waiting
    </Badge>
  )
}

const RequestItem = (props: Props) => {
  const router = useRouter()
  return (
    <ListItem onClick={() => router.push(`/dashboard/request/${props.request.id}`)}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        _hover={{ background: useColorModeValue('gray.100', 'gray.900') }}
      >
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
            >
              {moment(props.request.createdAt).format('DD.MM.YYYY HH:mm')}{' '}
              <StatusBadge status={props.request.status} />
            </Box>
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            {(props.request as any).place.title}
          </Box>
          <Box>
            {props.request.adults} adults &bull; {props.request.children} children
          </Box>
        </Box>
      </Box>
    </ListItem>
  )
}

export default RequestItem
