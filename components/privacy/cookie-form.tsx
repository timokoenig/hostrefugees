/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, Switch, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { COOKIE_CONSENT, getCookie, setCookie } from 'utils/cookies'

const COOKIE_TECHNICALLY_REQUIRED = 'technically_required'
const COOKIE_MARKETING = 'marketing'
const COOKIE_ANALYTICS = 'analytics'

const CookieForm = () => {
  const { t } = useTranslation('common')
  const [cookies, setCookies] = useState<string>(getCookie(COOKIE_CONSENT) ?? '')

  const updateCookie = (name: string) => {
    let updatedCookies = cookies.split(',')
    if (cookies.includes(name)) {
      updatedCookies = updatedCookies.filter(c => c != name)
    } else {
      updatedCookies.push(name)
    }
    if (!updatedCookies.includes(COOKIE_TECHNICALLY_REQUIRED)) {
      updatedCookies.push(COOKIE_TECHNICALLY_REQUIRED)
    }
    setCookie(COOKIE_CONSENT, updatedCookies.join(','))
    setCookies(updatedCookies.join(','))
  }

  return (
    <>
      <Box mb="5">
        <Text fontSize="lg">{t('privacy.cookie.technically')}</Text>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          {t('privacy.cookie.technically.info')}
        </Text>
        <Switch isChecked isDisabled onChange={() => {}} />
      </Box>
      <Box mb="5">
        <Text fontSize="lg">{t('privacy.cookie.analytics')}</Text>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          {t('privacy.cookie.analytics.info')}
        </Text>
        <Switch
          isChecked={cookies.includes(COOKIE_ANALYTICS)}
          onChange={() => updateCookie(COOKIE_ANALYTICS)}
        />
      </Box>
      <Box mb="5">
        <Text fontSize="lg">{t('privacy.cookie.marketing')}</Text>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          {t('privacy.cookie.marketing.info')}
        </Text>
        <Switch
          isChecked={cookies.includes(COOKIE_MARKETING)}
          onChange={() => updateCookie(COOKIE_MARKETING)}
        />
      </Box>
    </>
  )
}

export default CookieForm
