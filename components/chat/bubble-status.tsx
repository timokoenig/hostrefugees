import { Box, Flex } from '@chakra-ui/react'
import { Request, UserRole } from '@prisma/client'
import StatusGuest from 'components/dashboard/request/status-guest'
import StatusHost from 'components/dashboard/request/status-host'
import React from 'react'
import { MappedUser } from 'utils/models'

type Props = {
  request: Request
  user: MappedUser
  onCancel: () => void
}

const ChatBubbleStatus = (props: Props) => {
  return (
    <Flex mb="2" px="10">
      <Box py="5" px="10" marginLeft="auto" marginRight="auto">
        {props.user.role === UserRole.HOST && <StatusHost status={props.request.status} />}
        {props.user.role === UserRole.GUEST && (
          <StatusGuest status={props.request.status} onCancelRequest={props.onCancel} />
        )}
      </Box>
    </Flex>
  )
}

export default ChatBubbleStatus
