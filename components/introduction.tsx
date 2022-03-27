import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconType } from 'react-icons'
import { IoBodySharp, IoCheckmarkSharp, IoLogoGithub, IoShieldSharp } from 'react-icons/io5'

const Introduction = () => {
  const { t } = useTranslation('common')
  const textColor = useColorModeValue('gray.600', 'gray.400')
  const iconColor = useColorModeValue('blue.100', 'blue.900')

  const features: { icon: IconType; title: string; text: string }[] = [
    {
      icon: IoBodySharp,
      title: t('feature.private'),
      text: t('feature.private.text'),
    },
    {
      icon: IoCheckmarkSharp,
      title: t('feature.verified'),
      text: t('feature.verified.text'),
    },
    {
      icon: IoShieldSharp,
      title: t('feature.safety'),
      text: t('feature.safety.text'),
    },
    {
      icon: IoLogoGithub,
      title: t('feature.opensource'),
      text: t('feature.opensource.text'),
    },
  ]

  return (
    <Box p={4} mb="20">
      <Stack spacing={4} as={Container} maxW="3xl" textAlign="center">
        <Heading fontSize="3xl">{t('howto')}</Heading>
        <Text color={textColor} fontSize="xl">
          {t('howto.text')}
        </Text>
      </Stack>

      <Container maxW="6xl" mt={20} pt="10">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature, key) => (
            <VStack key={key} textAlign="center">
              <Flex
                rounded="full"
                width={12}
                height={12}
                backgroundColor={iconColor}
                align="center"
                justify="center"
              >
                <Icon as={feature.icon} color="blue.500" width={6} height={6} />
              </Flex>
              <Text fontWeight={600}>{feature.title}</Text>
              <Text color={textColor}>{feature.text}</Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Introduction
