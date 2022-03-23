import { Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { IoBookSharp } from 'react-icons/io5'
import Section from './section'

const SectionOther = () => {
  return (
    <Section id="other" title="Other Information" icon={IoBookSharp} color="purple">
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        We are actively working on this page to provide more information to give you a good overview
        on where to start in Germany. Please check it every once in a while to stay up to date with
        the newest information and links.
      </Text>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>Last Update: 23.03.2022</Text>
    </Section>
  )
}

export default SectionOther
