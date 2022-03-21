import { Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { IoBedSharp } from 'react-icons/io5'
import Section from './section'

const SectionPlaces = () => {
  return (
    <Section id="places" title="A Place To Stay" icon={IoBedSharp} color="blue">
      <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore
      </Text>
    </Section>
  )
}

export default SectionPlaces
