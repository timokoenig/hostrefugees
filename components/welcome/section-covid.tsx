import { Heading, ListItem, Text, UnorderedList, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { IoMedicalSharp } from 'react-icons/io5'
import Section from './section'

const SectionCovid = () => {
  return (
    <Section id="covid" title="Current Covid Restrictions" icon={IoMedicalSharp} color="red">
      <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
        Every state in Germany has their own Covid Regulations so please inform yourself in the
        state you are in. Here is a list of general applicable rules and recommendations.
      </Text>

      <Heading as="h4" size="md">
        Contacts
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
        Please continue to avoid all personal contacts that are not essential. "Keeping your
        distance" helps to avoid transmission of the coronavirus. Therefore, always keep a distance
        of 1.50 meters from other people.
        <br />
        <br />
        There are no restrictions for private meetings.
      </Text>

      <Heading as="h4" size="md">
        Maskenpflicht
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
        In closed rooms of public facilities are FF2 masks mandatory for everyone older than 14
        years. Children up to 14 years need to wear a medical mask. Children under the age of 6 are
        exempt from the mask requirement.
      </Text>

      <Heading as="h4" size="md">
        3G Entry Restriction
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
        3G entry resitrctions allow everyone who is fully vaccinated, recovered, or tested to
        participate. The following areas apply to the 3G restrictions if not stated otherwise:
        <UnorderedList>
          <ListItem>Restaurants / Bars (inside / outside)</ListItem>
          <ListItem>Body-Related Services, like hairstylist and accomondations</ListItem>
          <ListItem>Swimming Pools, Spas, Saunas, indoor sports facilities</ListItem>
        </UnorderedList>
      </Text>

      <Heading as="h4" size="md">
        2G+ Entry Restriction
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
        2G+ entry restrictions allow everyone who is fully vaccinated, or recovered to participate
        but those people need to show proof of a negative rapid or PCR test result. Under certain
        conditions you don't need to provide an additional test. Please look up the local
        requirements for the test exception. The following areas apply to the 2G+ restrictions if
        not stated otherwise:
        <UnorderedList>
          <ListItem>Clubs</ListItem>
        </UnorderedList>
      </Text>

      <Heading as="h4" size="md">
        Tests
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
        In some cases you need an additional rapid or PCR test result. Please make sure the test
        fulfills the following requirements:
        <UnorderedList>
          <ListItem>Test Result must be NEGATIVE</ListItem>
          <ListItem>PCR tests are only valid for 48 hours</ListItem>
          <ListItem>Rapid tests are only valid for 24 hours</ListItem>
        </UnorderedList>
      </Text>
    </Section>
  )
}

export default SectionCovid
