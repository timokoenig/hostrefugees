import { Button, Flex, Link, Spacer, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { COOKIE_CONSENT, getCookie, setCookie } from 'utils/cookies'

const CookieConsent = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const backgroundColor = useColorModeValue('gray.200', 'gray.500')

  const agreeOnlyEssentialCookies = () => {
    setCookie(COOKIE_CONSENT, 'technically_required')
    router.reload()
  }

  const agreeAllCookies = () => {
    setCookie(COOKIE_CONSENT, 'technically_required,analytics,marketing')
    router.reload()
  }

  if (getCookie(COOKIE_CONSENT) != null) {
    return null
  }

  return (
    <Stack
      backgroundColor={backgroundColor}
      position="fixed"
      flex="1"
      bottom="0"
      rounded="lg"
      margin="2"
      padding="5"
      maxWidth="100%"
    >
      <Text>
        <Trans i18nKey="privacy.consent.text" t={t}>
          a
          <Link href="/privacy/cookies" fontWeight="semibold">
            1
          </Link>
          b
        </Trans>
      </Text>
      <Text>
        <Trans i18nKey="privacy.consent.info" t={t}>
          a
          <Link href="/privacy" target="_blank" fontWeight="semibold">
            1
          </Link>
          b
        </Trans>
      </Text>
      <Flex flexDirection={{ base: 'column', md: 'row' }} align="flex-end">
        <Spacer />
        <Button
          size="lg"
          width={{ base: '100%', md: 'auto' }}
          mr={{ base: '0', md: '5' }}
          fontWeight="regular"
          mb={{ base: 5, md: 0 }}
          onClick={agreeOnlyEssentialCookies}
          wordBreak="break-word"
          whiteSpace="normal"
        >
          {t('privacy.consent.continue.partial')}
        </Button>
        <Button
          colorScheme="blue"
          width={{ base: '100%', md: 'auto' }}
          size="lg"
          onClick={agreeAllCookies}
          wordBreak="break-word"
          whiteSpace="normal"
        >
          {t('privacy.consent.continue.full')}
        </Button>
      </Flex>
    </Stack>
  )
}

export default CookieConsent
