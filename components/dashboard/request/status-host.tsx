import { GridItem, SimpleGrid, Text } from '@chakra-ui/react'
import { RequestStatus } from '@prisma/client'
import React from 'react'
import Button from '../../common/button'
import Status from './status'

type Props = {
  status: RequestStatus | null
  onAccept: () => void
  onDecline: () => void
}

const StatusHost = (props: Props): JSX.Element => {
  switch (props.status) {
    case RequestStatus.ACCEPTED:
      return (
        <Status color="green.500" title="ACCEPTED">
          <Text>
            Thanks for accepting this application.
            <br />
            You will receive an email with further details.
          </Text>
        </Status>
      )
    case RequestStatus.DECLINED:
      return (
        <Status color="red.500" title="DECLINED">
          <Text>The application has been declined</Text>
        </Status>
      )
    case RequestStatus.CANCELED:
      return (
        <Status color="gray.500" title="CANCELED">
          <Text>The application has been canceled by the user</Text>
        </Status>
      )
    default:
      return (
        <SimpleGrid columns={3} spacing={5}>
          <GridItem>
            <Button title="Decline" color="red.500" fullWidth onClick={props.onDecline} />
          </GridItem>
          <GridItem colSpan={2}>
            <Button title="Accept" color="green.500" fullWidth onClick={props.onAccept} />
          </GridItem>
        </SimpleGrid>
      )
  }
}

export default StatusHost
