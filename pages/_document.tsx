/* eslint-disable @next/next/no-title-in-document-head */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ColorModeScript, extendTheme } from '@chakra-ui/react'
import AnalyticsHeader from 'components/privacy/analytics-header'
import NextDocument, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import React from 'react'
import { COOKIE_CONSENT } from 'utils/cookies'

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
})

type CustomDocumentInitialProps = DocumentInitialProps & {
  analyticsEnabled: boolean
}

export default class Document extends NextDocument<CustomDocumentInitialProps> {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="HostRefugees, at you place!" />
          <meta name="theme-color" content="#ffffff" />
          <meta property="og:title" content="hostrefugees.eu" />
          <meta property="og:url" content="https://hostrefugees.eu" />
          <meta property="og:image" content="https://hostrefugees.eu/icon-192x192.png" />
          <meta property="og:description" content="HostRefugees, at you place!" />
          <meta property="og:type" content="website" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          {this.props.analyticsEnabled && <AnalyticsHeader />}
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }

  static async getInitialProps(ctx: DocumentContext): Promise<CustomDocumentInitialProps> {
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => App,
        enhanceComponent: Component => Component,
      })

    const initialProps = await NextDocument.getInitialProps(ctx)

    const analyticsEnabled =
      (ctx.req?.headers.cookie ?? '')
        .split(';')
        .find(c => c.includes(COOKIE_CONSENT))
        ?.includes('analytics') ?? false

    return {
      ...initialProps,
      analyticsEnabled,
    }
  }
}
