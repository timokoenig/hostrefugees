/* eslint-disable no-await-in-loop */
import translate from './translate'

type Trans = {
  lang: string
  text: string
}

export type Translation = {
  sourceLanguage: string
  translations: Trans[]
}

const translateAll = async (text: string): Promise<Translation | undefined> => {
  const languages = ['en', 'de', 'uk']
  const res: Translation = {
    sourceLanguage: '',
    translations: [],
  }
  for (let i = 0; i < languages.length; i++) {
    try {
      const transRes = await translate(text, languages[i])
      if (res.sourceLanguage == '') {
        res.sourceLanguage = transRes.detectedSourceLanguage
      }
      res.translations.push({
        lang: languages[i],
        text: transRes.translatedText,
      })
    } catch (err: unknown) {
      console.log(err)
    }
  }
  if (res.sourceLanguage == '') {
    return undefined
  }
  return res
}

export default translateAll