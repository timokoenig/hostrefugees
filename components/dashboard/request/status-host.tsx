import { GridItem, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import { RequestStatus } from 'utils/model'
import Button from '../../common/button'
import Status from './status'

type Props = {
  status: RequestStatus | undefined
}

const StatusHost = (props: Props): JSX.Element => {
  switch (props.status) {
    case RequestStatus.Accepted:
      return (
        <Status color="green.500" title="ACCEPTED">
          <Text>
            Thanks for accepting this application.
            <br />
            You will receive an email with further details.
          </Text>
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
          <Text>The application has been canceled by the user</Text>
        </Status>
      )
    default:
      return (
        <SimpleGrid columns={3} spacing={5}>
          <GridItem>
            <Button title="Decline" color="red.500" fullWidth />
          </GridItem>
          <GridItem colSpan={2}>
            <Button title="Accept" color="green.500" fullWidth />
          </GridItem>
        </SimpleGrid>
      )
  }
}

export default StatusHost
