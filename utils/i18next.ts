/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  .use(LanguageDetector)
  .init({
    interpolation: { escapeValue: false },
    fallbackLng: 'en',
    resources: {
      en: {
        common: require('../translations/en/common.json'),
      },
    },
  })
  .catch(console.log)

export default i18next
