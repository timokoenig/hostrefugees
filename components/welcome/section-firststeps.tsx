import {
  Heading,
  Icon,
  Link,
  ListItem,
  Text,
  UnorderedList,
  useColorModeValue,
} from '@chakra-ui/react'
import parse from 'html-react-parser'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IoBulbSharp, IoCallOutline, IoOpenOutline } from 'react-icons/io5'
import Section from './section'

const SectionFirstSteps = () => {
  const { t } = useTranslation('common')
  return (
    <Section
      id="first-steps"
      title={t('welcomegermany.feature.first')}
      icon={IoBulbSharp}
      color="yellow"
    >
      <Heading as="h4" size="md">
        {t('welcomegermany.first.link')}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        <UnorderedList>
          <ListItem>
            <Link href="https://www.germany4ukraine.de">
              {parse(t('welcomegermany.first.link.1'))}
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.bmas.de/DE/Europa-und-die-Welt/Europa/Ukraine/FAQ-EN/faq-art-en.html">
              {parse(t('welcomegermany.first.link.2'))}
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.bmi.bund.de/SharedDocs/faqs/DE/themen/ministerium/ukraine-krieg/faq-ukraine-artikel.html;jsessionid=CF5532187BE561293D381EAD419AFDEE.2_cid295">
              {parse(t('welcomegermany.first.link.3'))}
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.integrationsbeauftragte.de/ib-de/staatsministerin/війна-в-україні-2008512">
              {parse(t('welcomegermany.first.link.4'))}
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.bundesgesundheitsministerium.de/en/topics/health-guide-for-asylum-seekers.html">
              {parse(t('welcomegermany.first.link.5'))}
              <Icon as={IoOpenOutline} w="4" h="4" mx="1" pt="1" />
            </Link>
          </ListItem>
        </UnorderedList>
      </Text>
      <Heading as="h4" size="md">
        {t('welcomegermany.first.phone')}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
        <b>{t('welcomegermany.first.phone.police')}: </b>
        <Link href="tel:110">
          <Icon as={IoCallOutline} w="4" h="4" mx="1" pt="1" />
          110
        </Link>
        <br />
        <b>{t('welcomegermany.first.phone.ambulance')}: </b>
        <Link href="tel:112">
          <Icon as={IoCallOutline} w="4" h="4" mx="1" pt="1" />
          112
        </Link>
        <br />
        <b>{t('welcomegermany.first.phone.womenviolence')}: </b>
        <Link href="tel:08000116016">
          <Icon as={IoCallOutline} w="4" h="4" mx="1" pt="1" />
          08000 116 016
        </Link>{' '}
        ({t('welcomegermany.first.phone.womenviolence.info')})
        <br />
        <b>{t('welcomegermany.first.phone.counseling')}: </b>
        <Link href="tel:030440308454">
          <Icon as={IoCallOutline} w="4" h="4" mx="1" pt="1" />
          030 - 440 308 454
        </Link>{' '}
        ({t('welcomegermany.first.phone.counseling.info')})
      </Text>
    </Section>
  )
}

export default SectionFirstSteps
