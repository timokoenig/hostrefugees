import axios from 'axios'

type Translation = {
  translatedText: string
  detectedSourceLanguage: string
}

type TranslationResponse = {
  translations: Translation[]
}

type Response = {
  data: TranslationResponse
}

const translate = async (text: string, targetLanguage: string): Promise<Translation> => {
  const apiKey = process.env.GOOGLE_TRANSLATE_KEY
  if (apiKey === undefined) {
    throw new Error('GOOGLE_TRANSLATE_KEY env not set')
  }
  const res = await axios.post(
    `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
    JSON.stringify({
      q: text,
      target: targetLanguage,
      format: 'text',
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const data = res.data as Response
  if (data.data.translations.length === 0) {
    throw new Error('No Translation available')
  }
  return data.data.translations[0]
}

export default translate
