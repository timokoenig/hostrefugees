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

const translationsWords: { de: string; ua: string }[] = [
  { de: 'Hallo', ua: 'Здравствуйте' },
  { de: 'Bitte', ua: 'Будь ласка' },
  { de: 'Danke', ua: 'Спасибі' },
  { de: 'Tschüss', ua: 'до побачення' },
  { de: 'Krankenhaus', ua: 'Лікарня' },
  { de: 'Arzt', ua: 'лікар' },
  { de: 'Apotheke', ua: 'аптека' },
  { de: 'Amt', ua: 'урядова установа' },
  { de: 'Hilfe', ua: 'допомогти' },
  { de: 'Polizei', ua: 'Поліція' },
  { de: 'Feuerwehr', ua: 'Пожежне депо' },
]

const translationsPhrases: { de: string; ua: string }[] = [
  { de: 'Können Sie mir helfen?', ua: 'Можеш допомогти мені?' },
  { de: 'Ich spreche kein Deutsch', ua: 'Я не розмовляю німецькою' },
  { de: 'Sprechen Sie Englisch?', ua: 'Ви розмовляєте англійською?' },
  { de: 'Wo finde ich... den Bahnhof?', ua: 'Де я можу знайти... залізнична станція?' },
  { de: 'Wo finde ich... eine Toilette?', ua: 'Де я можу знайти... туалет?' },
  { de: 'Wo ist der nächste Supermarkt?', ua: 'Де наступний супермаркет?' },
  { de: 'Ich habe mich verlaufen', ua: 'Я заблукав' },
]

const SectionTranslations = () => {
  return (
    <Section id="translations" title="How Do I Say This?" icon={IoChatbubblesSharp} color="green">
      <Text color={useColorModeValue('gray.600', 'gray.400')}>
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
              {translationsWords.map(trans => (
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
              {translationsPhrases.map(trans => (
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
