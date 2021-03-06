/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import '../styles/globals.css'
import i18next from '../utils/i18next'

const CookieConsent = dynamic(() => import('components/cookieconsent'), {
  ssr: false,
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <I18nextProvider i18n={i18next}>
        <CSSReset />
        <Component {...pageProps} />
        <CookieConsent />
      </I18nextProvider>
    </ChakraProvider>
  )
}

export default App
