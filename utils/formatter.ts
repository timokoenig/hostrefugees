import moment from 'moment'
import { TFunction } from 'react-i18next'
import { MappedPlace } from './models'

export const formatAvailability = (t: TFunction, place: MappedPlace): string => {
  const startFormatted = moment(place.availabilityStart).format('DD.MM.YYYY')
  if (place.availabilityEnd) {
    const endFormatted = moment(place.availabilityEnd).format('DD.MM.YYYY')
    return t(`place.availability.fromto`, { start: startFormatted, end: endFormatted })
  }
  if (moment().isAfter(moment(place.availabilityStart))) {
    return t(`place.availability.now`)
  }
  return t(`place.availability.from`, { start: startFormatted })
}

export const formatUrl = (url: string): string => {
  return url.replace('http://', '').replace('https://', '').replace('www.', '')
}
