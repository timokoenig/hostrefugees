import { Badge, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { Request, SafetyCheck } from '@prisma/client'
import moment from 'moment'
import React from 'react'

type Props = {
  request: Request & { safetyChecks: SafetyCheck[] }
  onClick: () => void
}

type DisplayItem = {
  title: string
  badge: string
  color: string
}

const SafetyItem = (props: Props) => {
  let displayItems: DisplayItem[] = [{ title: 'Safety Check', badge: 'OVERDUE', color: 'yellow' }]

  if (props.request.safetyChecks.length > 0) {
    displayItems = props.request.safetyChecks.map(check => {
      return {
        title:
          check.userId == props.request.userId
            ? `Guest SafetyCheck - ${moment(check.createdAt).format('DD.MM.YYYY HH:mm')}`
            : `Author SafetyCheck - ${moment(check.createdAt).format('DD.MM.YYYY HH:mm')}`,
        badge: check.safe ? 'SAFE' : 'NOT SAFE',
        color: check.safe ? 'green' : 'red',
      }
    })
  }

  return (
    <Flex
      cursor="pointer"
      _hover={{ background: useColorModeValue('gray.100', 'gray.900') }}
      p="5"
      rounded="10"
      onClick={props.onClick}
    >
      <Box>
        <Text fontWeight="bold">Safety Check</Text>
        {displayItems.map((item, i) => (
          <Text key={i}>
            <Badge mr="1" colorScheme={item.color}>
              {item.badge}
            </Badge>
            {item.title}
          </Text>
        ))}
        <Text fontSize="sm">{`Start Date ${moment(props.request.startDate)
          .add(1, 'day')
          .format('DD.MM.YYYY')}`}</Text>
      </Box>
    </Flex>
  )
}

export default SafetyItem
