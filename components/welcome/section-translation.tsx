import {
  GridItem,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { IoChatbubblesSharp } from 'react-icons/io5'
import Section from './section'

const translations: { de: string; ua: string }[] = [
  { de: 'Hallo', ua: 'Здравствуйте' },
  { de: 'Ich spreche kein Deutsch', ua: 'Я не розмовляю німецькою' },
  { de: 'Sprichst du Englisch?', ua: 'Ви розмовляєте англійською?' },
  { de: 'Wo ist der nächste Supermarkt?', ua: 'Де наступний супермаркет?' },
  { de: 'Ich suche ...', ua: 'Я шукаю' },
  { de: 'Krankenhaus', ua: 'лікарні' },
  { de: 'Arzt', ua: 'лікар' },
  { de: 'Apotheke', ua: 'аптека' },
  { de: 'Amt', ua: 'урядова установа' },
  { de: 'Hilfe', ua: 'допомогти' },
]

const SectionTranslations = () => {
  return (
    <Section id="translations" title="How Do I Say This?" icon={IoChatbubblesSharp} color="green">
      <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
        A list of common words and phrases
      </Text>
      <SimpleGrid templateColumns={{ sm: '1fr', md: '1fr 1fr' }} spacing={20}>
        <GridItem>
          <Table size="md">
            <Thead>
              <Tr>
                <Th>German</Th>
                <Th>Ukrainian</Th>
              </Tr>
            </Thead>
            <Tbody>
              {translations.map(trans => (
                <Tr key={trans.de}>
                  <Td>{trans.de}</Td>
                  <Td>{trans.ua}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </GridItem>
        <GridItem>
          <Table size="md">
            <Thead>
              <Tr>
                <Th>German</Th>
                <Th>Ukrainian</Th>
              </Tr>
            </Thead>
            <Tbody>
              {translations.map(trans => (
                <Tr key={trans.de}>
                  <Td>{trans.de}</Td>
                  <Td>{trans.ua}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </GridItem>
      </SimpleGrid>
    </Section>
  )
}

export default SectionTranslations
