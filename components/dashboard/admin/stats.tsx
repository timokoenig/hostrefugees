import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

type ItemProps = {
  label: string
  count: number
  change: number
  onClick: () => void
}

const StatItem = (props: ItemProps) => (
  <Stat rounded="10" cursor="pointer" _hover={{ color: 'blue.600' }} onClick={props.onClick}>
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
  const router = useRouter()
  const stats: ItemProps[] = [
    {
      label: 'Users',
      count: props.usersCount,
      change: props.usersChange,
      onClick: () => router.push('/dashboard/admin/user'),
    },
    {
      label: 'Places',
      count: props.placesCount,
      change: props.placesChange,
      onClick: () => router.push('/dashboard/admin/place'),
    },
    {
      label: 'Requests',
      count: props.requestsCount,
      change: props.requestsChange,
      onClick: () => router.push('/dashboard/admin/request'),
    },
    {
      label: 'Posts',
      count: props.postsCount,
      change: props.postsChange,
      onClick: () => router.push('/dashboard/admin/post'),
    },
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
