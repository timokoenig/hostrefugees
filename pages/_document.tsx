/* eslint-disable @next/next/no-title-in-document-head */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ColorModeScript, extendTheme } from '@chakra-ui/react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
})

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="HostRefugees.eu" />
          <meta name="theme-color" content="#ffffff" />
          <meta property="og:title" content="hostrefugees.eu" />
          <meta property="og:url" content="https://hostrefugees.eu" />
          <meta property="og:image" content="https://hostrefugees.eu/icon-192x192.png" />
          <meta property="og:description" content="hostrefugees.eu" />
          <meta property="og:type" content="website" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
