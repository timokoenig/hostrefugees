import { BathroomType, PlaceType, UserRole } from '@prisma/client'
import { Translation } from './translate-all'

export type MappedUser = {
  id: string
  firstname: string
  role: UserRole
  languages: string[]
}

export type MappedPlace = {
  id: string
  createdAt: Date
  author: MappedUser
  approved: boolean
  active: boolean
  reserved: boolean
  title: string
  titleTranslation: Translation | null
  description: string
  descriptionTranslation: Translation | null
  placeAdults: number
  placeChildren: number
  placeAdultWomen: boolean
  placeAdultMen: boolean
  type: PlaceType
  rooms: number
  beds: number
  bathroom: BathroomType
  adults: number
  children: number
  pets: boolean
  addressCity: string
  addressCityLat: string | null
  addressCityLng: string | null
  houseRules: string
  houseRulesTranslation: Translation | null
  availabilityStart: Date
  availabilityEnd: Date | null
  photos: string[]
}
