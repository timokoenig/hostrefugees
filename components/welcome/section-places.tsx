import { Button, Heading, Icon, Link, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { IoBedSharp, IoOpenOutline } from 'react-icons/io5'
import Section from './section'

const SectionPlaces = () => {
  return (
    <Section id="places" title="A Place To Stay" icon={IoBedSharp} color="blue">
      <Heading as="h4" size="md">
        State-run initial reception centres
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        You can take part in the reception program for war refugees from Ukraine by applying for a
        residence permit for temprary protection at your local foreigners authority, which you can
        find in the BAMF-NAvI directory at{' '}
        <Link
          href="https://bamf-navi.bamf.de/de/Themen/Behoerden"
          target="_blank"
          fontWeight="semibold"
        >
          https://bamf-navi.bamf.de/de/Themen/Behoerden{' '}
          <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
        </Link>
        .
      </Text>
      <Heading as="h4" size="md">
        Private Accommodation
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        <Text as="span" fontWeight="semibold">
          HostRefugees
        </Text>{' '}
        is a platform where private people can offer their place to refugees for free. As a refugee
        you can apply for a temporary stay at those places.
      </Text>
      <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
        <Button as={Link} href="/place" fontWeight="semibold">
          Find a place from one of our amazing hosts
        </Button>
      </Text>
    </Section>
  )
}

export default SectionPlaces
