import { Text } from '@chakra-ui/react'
import React from 'react'
import { RequestStatus } from 'utils/model'
import Status from './status'

type Props = {
  status: RequestStatus | undefined
}

const StatusGuest = (props: Props): JSX.Element => {
  switch (props.status) {
    case RequestStatus.Accepted:
      return (
        <Status color="green.500" title="ACCEPTED">
          <Text>You will receive an email with further details.</Text>
        </Status>
      )
    case RequestStatus.Declined:
      return (
        <Status color="red.500" title="DECLINED">
          <Text>The application has been declined</Text>
        </Status>
      )
    case RequestStatus.Canceled:
      return (
        <Status color="gray.500" title="CANCELED">
          <Text>The application has been canceled</Text>
        </Status>
      )
    default:
      return (
        <Status color="yellow.500" title="WAITING">
          <Text>Waiting for the host to accept the application</Text>
        </Status>
      )
  }
}

export default StatusGuest
