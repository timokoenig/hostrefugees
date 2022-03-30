import { Avatar, Badge, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { User } from '@prisma/client'
import moment from 'moment'
import React from 'react'

type Props = {
  user: User
  onClick: () => void
}

const UserItem = (props: Props) => (
  <Flex
    cursor="pointer"
    _hover={{ background: useColorModeValue('gray.100', 'gray.900') }}
    p="5"
    rounded="10"
    onClick={props.onClick}
  >
    <Avatar src={`/api/user/${props.user.id}/photo`} />
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
