import { Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { IoBookSharp } from 'react-icons/io5'
import Section from './section'

const SectionOther = () => {
  return (
    <Section id="other" title="Other Information" icon={IoBookSharp} color="purple">
      <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore
      </Text>
    </Section>
  )
}

export default SectionOther
