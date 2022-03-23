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
import { IoBulbSharp, IoCallOutline, IoOpenOutline } from 'react-icons/io5'
import Section from './section'

const SectionFirstSteps = () => {
  return (
    <Section id="first-steps" title="First Steps" icon={IoBulbSharp} color="yellow">
      <Heading as="h4" size="md">
        Important Websites
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        <UnorderedList>
          <ListItem>
            <Link href="https://www.germany4ukraine.de">
              <b>Germany4Ukraine Help Portal</b> by the Germany Government
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.bmas.de/DE/Europa-und-die-Welt/Europa/Ukraine/FAQ-EN/faq-art-en.html">
              <b>Frequently asked questions for Ukranian refugees</b> by ministry for labor and
              social affairs
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.bmi.bund.de/SharedDocs/faqs/DE/themen/ministerium/ukraine-krieg/faq-ukraine-artikel.html;jsessionid=CF5532187BE561293D381EAD419AFDEE.2_cid295">
              <b>Frequently asked questions for Ukranian refugees</b> by the ministry of interior
              and community
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.integrationsbeauftragte.de/ib-de/staatsministerin/війна-в-україні-2008512">
              <b>Frequently asked questions for Ukranian refugees</b> by the ministry for migration,
              refugees and integration
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.bundesgesundheitsministerium.de/en/topics/health-guide-for-asylum-seekers.html">
              <b>Online Health Guide</b> for Asylum Seekers
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
        </UnorderedList>
      </Text>
      <Heading as="h4" size="md">
        Important Phone Numbers
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        <b>Police: </b>
        <Link href="tel:110">
          <Icon as={IoCallOutline} w="4" h="4" mx="1" pt="1" />
          110
        </Link>
        <br />
        <b>Ambulance / Fire Department: </b>
        <Link href="tel:112">
          <Icon as={IoCallOutline} w="4" h="4" mx="1" pt="1" />
          112
        </Link>
        <br />
        <b>Support Hotline - Violence Against Women: </b>
        <Link href="tel:08000116016">
          <Icon as={IoCallOutline} w="4" h="4" mx="1" pt="1" />
          08000 116 016
        </Link>{' '}
        (available in German, Ukrainian, Polish)
        <br />
        <b>Telephone Counseling: </b>
        <Link href="tel:030440308454">
          <Icon as={IoCallOutline} w="4" h="4" mx="1" pt="1" />
          030 - 440 308 454
        </Link>{' '}
        (available in Russian)
      </Text>
    </Section>
  )
}

export default SectionFirstSteps
