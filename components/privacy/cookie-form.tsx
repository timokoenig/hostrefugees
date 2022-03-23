/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, Switch, Text, useColorModeValue } from '@chakra-ui/react'
import cookieCutter from 'cookie-cutter'
import moment from 'moment'
import React, { useState } from 'react'

const COOKIE_CONSENT = 'cookie-consent'
const COOKIE_TECHNICALLY_REQUIRED = 'technically_required'
const COOKIE_MARKETING = 'marketing'
const COOKIE_ANALYTICS = 'analytics'

const CookieForm = () => {
  const [cookies, setCookies] = useState<string>(cookieCutter.get(COOKIE_CONSENT) ?? '')

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
    cookieCutter.set(COOKIE_CONSENT, updatedCookies.join(','), {
      path: '/',
      expires: moment().add(1, 'year').toDate(),
    })
    setCookies(updatedCookies.join(','))
  }

  return (
    <>
      <Box mb="5">
        <Text fontSize="lg">Technically necessary cookies</Text>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          Enables you to navigate, use the basic functions, and to store preferences
        </Text>
        <Switch isChecked isDisabled onChange={() => {}} />
      </Box>
      <Box mb="5">
        <Text fontSize="lg">Analytics cookies</Text>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          Enables us to determine how visitors interact with our service in order to improve the
          user experience
        </Text>
        <Switch
          isChecked={cookies.includes(COOKIE_ANALYTICS)}
          onChange={() => updateCookie(COOKIE_ANALYTICS)}
        />
      </Box>
      <Box mb="5">
        <Text fontSize="lg">Marketing cookies</Text>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          Enables us to offer and evaluate relevant content and interest-based advertising
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
