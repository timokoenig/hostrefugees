import {
  Flex,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IoBasketSharp,
  IoBedSharp,
  IoBookSharp,
  IoBulbSharp,
  IoChatbubblesSharp,
  IoMedicalSharp,
} from 'react-icons/io5'

interface FeatureProps {
  id: string
  text: string
  iconBg: string
  icon: ReactElement
}

const Feature = ({ id, text, icon, iconBg }: FeatureProps) => {
  const router = useRouter()
  return (
    <Stack
      direction="row"
      align="center"
      rounded="md"
      px="4"
      py="2"
      onClick={() => router.push(`#${id}`)}
      _hover={{ background: useColorModeValue('gray.100', 'gray.700'), cursor: 'pointer' }}
    >
      <Flex w={8} h={8} align="center" justify="center" rounded="full" bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  )
}

const Overview = () => {
  const { t } = useTranslation('common')
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
      <Stack spacing={4}>
        <Heading as="h1" size="xl">
          {t('welcomegermany')}
        </Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
          {t('welcomegermany.info')}
        </Text>
        <Stack divider={<StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />}>
          <Feature
            id="first-steps"
            icon={<Icon as={IoBulbSharp} color="yellow.500" w={5} h={5} />}
            iconBg={useColorModeValue('yellow.100', 'yellow.900')}
            text={t('welcomegermany.feature.first')}
          />
          <Feature
            id="places"
            icon={<Icon as={IoBedSharp} color="blue.500" w={5} h={5} />}
            iconBg={useColorModeValue('blue.100', 'blue.900')}
            text={t('welcomegermany.feature.place')}
          />
          <Feature
            id="translations"
            icon={<Icon as={IoChatbubblesSharp} color="green.500" w={5} h={5} />}
            iconBg={useColorModeValue('green.100', 'green.900')}
            text={t('welcomegermany.feature.translation')}
          />
          <Feature
            id="necessities"
            icon={<Icon as={IoBasketSharp} color="orange.500" w={5} h={5} />}
            iconBg={useColorModeValue('orange.100', 'orange.900')}
            text={t('welcomegermany.feature.necessities')}
          />
          <Feature
            id="covid"
            icon={<Icon as={IoMedicalSharp} color="red.500" w={5} h={5} />}
            iconBg={useColorModeValue('red.100', 'red.900')}
            text={t('welcomegermany.feature.covid')}
          />
          <Feature
            id="other"
            icon={<Icon as={IoBookSharp} color="purple.500" w={5} h={5} />}
            iconBg={useColorModeValue('purple.100', 'purple.900')}
            text={t('welcomegermany.feature.other')}
          />
        </Stack>
      </Stack>
      <Flex>
        <Image src="/svg/undraw_a_whole_year_vnfm.svg" alt="Welcome To Germany icon" />
      </Flex>
    </SimpleGrid>
  )
}

export default Overview
