import {
  Heading,
  Icon,
  Link,
  ListItem,
  Text,
  UnorderedList,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { IoBasketSharp, IoOpenOutline } from 'react-icons/io5'
import Section from './section'

const SectionNecessities = () => {
  return (
    <Section
      id="necessities"
      title="Where Can I Find All Necessities?"
      icon={IoBasketSharp}
      color="orange"
    >
      <Heading as="h4" size="md">
        What supermarkets are there in Germany?
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        <UnorderedList>
          <ListItem>
            <Link href="https://www.aldi.de">
              Aldi
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.lidl.de">
              Lidl
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.penny.de">
              Penny
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.netto.de">
              Netto
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.rewe.de">
              Rewe
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.real.de">
              Real
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.globus.de">
              Globus
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.kaufland.de">
              Kaufland
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
        </UnorderedList>
      </Text>
      <Heading as="h4" size="md">
        What drug stores are there in Germany?
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
        <UnorderedList>
          <ListItem>
            <Link href="https://www.dm.de">
              dm
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.rossmann.de">
              Rossmann
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.mueller.de">
              Müller
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
        </UnorderedList>
      </Text>
      <Heading as="h4" size="md">
        How do I find a pharmacy?
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
        Pharmacies are labeled with a big red A (for Apotheke).
      </Text>
    </Section>
  )
}

export default SectionNecessities
