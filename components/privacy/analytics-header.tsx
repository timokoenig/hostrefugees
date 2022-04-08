import React from 'react'

type Props = {
  googleAnalyticsId: string
}

const AnalyticsHeader = (props: Props) => {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${props.googleAnalyticsId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${props.googleAnalyticsId}', { 'anonymize_ip': true });
                  `,
        }}
      />
    </>
  )
}

export default AnalyticsHeader
