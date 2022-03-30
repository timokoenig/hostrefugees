import { Avatar, Badge, Box, Flex, Text } from '@chakra-ui/react'
import { User } from '@prisma/client'
import moment from 'moment'
import React from 'react'

type Props = {
  user: User
}

const UserItem = (props: Props) => (
  <Flex>
    <Avatar src="https://bit.ly/sage-adebayo" />
    <Box ml="3">
      <Text fontWeight="bold">
        {`${props.user.firstname} ${props.user.lastname}`}
        <Badge ml="1" colorScheme="green">
          New
        </Badge>
      </Text>
      <Text fontSize="sm">{moment(props.user.createdAt).format('DD.MM.YYYY')}</Text>
    </Box>
  </Flex>
)

export default UserItem
