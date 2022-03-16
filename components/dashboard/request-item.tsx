import { Badge, Box, ListItem } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import { Request, RequestStatus } from 'utils/model'

type Props = {
  request: Request
}

const StatusBadge = (props: { status: RequestStatus | undefined }): JSX.Element => {
  if (props.status === RequestStatus.Accepted) {
    return (
      <Badge colorScheme="green" borderRadius="full" px="2" ml="2">
        Accepted
      </Badge>
    )
  }
  if (props.status === RequestStatus.Declined) {
    return (
      <Badge colorScheme="red" borderRadius="full" px="2" ml="2">
        Declined
      </Badge>
    )
  }
  if (props.status === RequestStatus.Canceled) {
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
        _hover={{ background: 'gray.100' }}
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
            {props.request.place.title}
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
