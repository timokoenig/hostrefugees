import { Place, PlaceType } from '@prisma/client'
import moment from 'moment'

export const formatPlaceType = (place: Place): string => {
  switch (place.type) {
    case PlaceType.PLACE:
      return 'Entire Place'
    case PlaceType.PRIVATE:
      return 'Private Room'
    case PlaceType.SHARED:
      return 'Shared Room'
    default:
      return place.type
  }
}

export const formatAvailability = (place: Place): string => {
  const startFormatted = moment(place.availabilityStart).format('DD.MM.YYYY')
  if (place.availabilityEnd) {
    const endFormatted = moment(place.availabilityEnd).format('DD.MM.YYYY')
    return `Available from ${startFormatted} to ${endFormatted}`
  }
  if (startFormatted == moment().format('DD.MM.YYYY')) {
    return 'Available now'
  }
  return `Available from ${startFormatted}`
}
