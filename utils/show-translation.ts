/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Prisma } from '@prisma/client'
import { Translation } from './translate-all'

export const isOrignal = (translation: Prisma.JsonValue): boolean => {
  if (translation == null || typeof localStorage == 'undefined') {
    return true
  }
  let lang = localStorage.getItem('i18nextLng')?.substring(0, 2)
  if (lang == 'ua') {
    lang = 'uk' // temporary workaround for stupid google things
  }
  const trans = translation as Translation
  return lang == undefined || trans.sourceLanguage == lang
}

const showTranslation = (original: string, translation: Prisma.JsonValue): string => {
  if (translation == null || typeof localStorage == 'undefined') {
    return original
  }
  let lang = localStorage.getItem('i18nextLng')?.substring(0, 2)
  if (lang == 'ua') {
    lang = 'uk' // temporary workaround for stupid google things
  }
  const trans = translation as Translation
  if (lang == undefined || trans.sourceLanguage == lang) {
    return original
  }
  for (let i = 0; i < trans.translations.length; i++) {
    if (trans.translations[i].lang == lang) {
      return trans.translations[i].text
    }
  }
  return original
}

export default showTranslation
