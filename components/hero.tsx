import { Button, Container, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation('common')
  const router = useRouter()
  return (
    <Container maxW="7xl">
      <Stack
        align="center"
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          >
            <Text
              as="span"
              position="relative"
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}
            >
              HostRefugees,
            </Text>
            <br />
            <Text as="span" color="blue.500">
              {t('hostrefugees.subtitle')}
            </Text>
          </Heading>
          <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'column', sm: 'row' }}>
            <Button
              rounded="full"
              size="lg"
              fontWeight="normal"
              px={6}
              colorScheme="blue"
              bg="blue.500"
              _hover={{ bg: 'blue.600' }}
              onClick={() => router.push('/place')}
            >
              {t('place.available')}
            </Button>
            <Button
              rounded="full"
              size="lg"
              fontWeight="normal"
              px={6}
              onClick={() => router.push('/welcome')}
            >
              {t('welcomegermany')}
            </Button>
          </Stack>
        </Stack>
        <Flex flex={1} justify="center" align="center" position="relative" w="full">
          <Image src="/svg/undraw_ukraine_biyg.svg" />
        </Flex>
      </Stack>
    </Container>
  )
}
