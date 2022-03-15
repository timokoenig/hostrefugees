import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import NumberInput from './number-input'

export default function Filter() {
  const [adults, setAdults] = useState<number>(0)
  const [children, setChildren] = useState<number>(0)
  return (
    <>
      <Text>Filter Criteria</Text>
      <SimpleGrid mb="10" columns={2}>
        <Box>
          <Text>Adults</Text>
          <NumberInput value={adults} onChange={setAdults} />
        </Box>
        <Box>
          <Text>Children</Text>
          <NumberInput value={children} onChange={setChildren} />
        </Box>
      </SimpleGrid>
    </>
  )
}
