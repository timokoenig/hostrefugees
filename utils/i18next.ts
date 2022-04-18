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
        languages: require('../translations/en/languages.json'),
      },
      de: {
        common: require('../translations/de/common.json'),
        languages: require('../translations/de/languages.json'),
      },
      ua: {
        common: require('../translations/ua/common.json'),
        languages: require('../translations/ua/languages.json'),
      },
      ru: {
        common: require('../translations/ru/common.json'),
        languages: require('../translations/ru/languages.json'),
      },
      pl: {
        common: require('../translations/pl/common.json'),
        languages: require('../translations/pl/languages.json'),
      },
    },
  })
  .catch(console.log)

export default i18next
