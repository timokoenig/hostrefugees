import { Button, Flex, Link, Spacer, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { COOKIE_CONSENT, getCookie, setCookie } from 'utils/cookies'

const CookieConsent = () => {
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
        We use cookies and similar technologies to provide certain features, enhance the user
        experience and deliver content that is relevant to your interests. Depending on their
        purpose, analysis and marketing cookies may be used in addition to technically necessary
        cookies. By clicking on &quot;Agree and continue&quot;, you declare your consent to the use
        of the aforementioned cookies.{' '}
        <Link href="/privacy/cookies" fontWeight="semibold">
          Here
        </Link>{' '}
        you can make detailed settings or revoke your consent (in part if necessary) with effect for
        the future.
      </Text>
      <Text>
        For further information, please refer to our{' '}
        <Link href="/privacy" target="_blank" fontWeight="semibold">
          Privacy Policy
        </Link>
        .
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
          Continue with technically required cookies only
        </Button>
        <Button
          colorScheme="blue"
          width={{ base: '100%', md: 'auto' }}
          size="lg"
          onClick={agreeAllCookies}
          wordBreak="break-word"
          whiteSpace="normal"
        >
          Agree and continue
        </Button>
      </Flex>
    </Stack>
  )
}

export default CookieConsent
