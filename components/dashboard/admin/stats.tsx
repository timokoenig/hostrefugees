import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'
import React from 'react'

type ItemProps = {
  label: string
  count: number
  change: number
}

const StatItem = (props: ItemProps) => (
  <Stat>
    <StatLabel>{props.label}</StatLabel>
    <StatNumber>{props.count}</StatNumber>
    <StatHelpText>
      <StatArrow type="increase" color={props.change > 0 ? 'green.500' : 'gray'} />
      {props.change > 0 ? `+ ${props.change}` : props.change}
    </StatHelpText>
  </Stat>
)

type Props = {
  usersCount: number
  usersChange: number
  placesCount: number
  placesChange: number
  requestsCount: number
  requestsChange: number
  postsCount: number
  postsChange: number
}

const Stats = (props: Props) => {
  const stats: ItemProps[] = [
    { label: 'Users', count: props.usersCount, change: props.usersChange },
    { label: 'Places', count: props.placesCount, change: props.placesChange },
    { label: 'Requests', count: props.requestsCount, change: props.requestsChange },
    { label: 'Posts', count: props.postsCount, change: props.postsChange },
  ]
  return (
    <StatGroup borderBottomWidth={1} borderColor="gray.200" pb="10" mb="10" textAlign="center">
      {stats.map(s => (
        <StatItem key={s.label} {...s} />
      ))}
    </StatGroup>
  )
}

export default Stats
