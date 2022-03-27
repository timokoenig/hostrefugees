import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  Select,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Github from './common/github'
import Kofi from './common/kofi'

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight="500" fontSize="lg" mb={2}>
      {children}
    </Text>
  )
}

export default function Footer() {
  const { t, i18n } = useTranslation('common')
  const { t: tLang } = useTranslation('languages')
  const [lang, setLang] = useState<string>(
    localStorage.getItem('i18nextLng')?.substring(0, 2) ?? 'en'
  )

  const onChangeLang = (newLang: string) => {
    i18n
      .changeLanguage(newLang)
      .then(() => setLang(newLang))
      .catch(console.log)
  }

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt="20"
    >
      <Container as={Stack} maxW="7xl" py={10}>
        <SimpleGrid templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' }} spacing={8} mb="10">
          <Stack spacing={6}>
            <Box>
              <Heading size="md" fontWeight="extrabold" color="blue.500">
                <Link href="/">HostRefugees.eu</Link>
              </Heading>
            </Box>
            <Text fontSize="sm">© 2022 Timo Koenig. All rights reserved</Text>
            <HStack spacing={5}>
              <Github />
              <Kofi />
            </HStack>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>{t('guest')}</ListHeader>
            <Link href="/welcome">{t('welcomegermany')}</Link>
            <Link href="/place">{t('place.available')}</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>{t('host')}</ListHeader>
            <Link href="/become-host">{t('becomehost')}</Link>
            <Link href="/documents">{t('documents')}</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>{t('support')}</ListHeader>
            <Link href="/help">{t('help')}</Link>
            <Link href="/imprint">{t('imprint')}</Link>
            <Link href="/privacy">{t('privacy')}</Link>
          </Stack>
        </SimpleGrid>
        <Flex flexDirection="row" justifyContent="center">
          <Select value={lang} onChange={e => onChangeLang(e.target.value)} width="200px">
            {/* <option value="de">{tLang('de')}</option> */}
            <option value="en">{tLang('en')}</option>
            {/* <option value="ua">{tLang('ua')}</option> */}
          </Select>
          <Spacer />
        </Flex>
      </Container>
    </Box>
  )
}
