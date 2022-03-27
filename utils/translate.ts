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
  const res = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
        format: 'text',
      }),
    }
  )
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  if (res.body === null) {
    throw new Error('Translation failed')
  }
  const data = (await res.json()) as Response
  if (data.data.translations.length === 0) {
    throw new Error('No Translation available')
  }
  return data.data.translations[0]
}

export default translate
