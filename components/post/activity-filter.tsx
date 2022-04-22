import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import CategoryPicker from './category-picker'
import CityPicker from './city-picker'

type Filter = {
  city: string
  category: string[]
}

type Props = {
  availableCities: string[]
  filter: Filter
  onChange: (newFilter: Filter) => void
}

const ActivityFilter = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Box>
      <Heading size="md">{t('filter')}</Heading>
      <Box py="5">
        <Text mb="2" fontSize="lg">
          {t('city')}
        </Text>
        <CityPicker
          availableValues={props.availableCities}
          value={props.filter.city}
          onChange={value => props.onChange({ ...props.filter, city: value })}
          size="sm"
        />
      </Box>
      <Box py="5">
        <Text mb="2" fontSize="lg">
          {t('category')}
        </Text>
        <CategoryPicker
          value={props.filter.category}
          onChange={value => props.onChange({ ...props.filter, category: value })}
          size="sm"
        />
      </Box>
    </Box>
  )
}

export default ActivityFilter
