import { HStack } from '@chakra-ui/react'
import React from 'react'
import CategoryPicker from './category-picker'
import CityPicker from './city-picker'

type Filter = {
  city: string[]
  category: string[]
}

type Props = {
  availableCities: string[]
  filter: Filter
  onChange: (newFilter: Filter) => void
}

const ActivityFilter = (props: Props) => (
  <HStack mb="10">
    <CityPicker
      availableValues={props.availableCities}
      value={props.filter.city}
      onChange={value => props.onChange({ ...props.filter, city: value })}
      size="sm"
    />
    <CategoryPicker
      value={props.filter.category}
      onChange={value => props.onChange({ ...props.filter, category: value })}
      size="sm"
    />
  </HStack>
)

export default ActivityFilter
