import { BathroomType, PlaceType, UserRole } from '@prisma/client'

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
  title: string
  description: string
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
  addressCity: string
  addressCityLat: string | null
  addressCityLng: string | null
  houseRules: string
  availabilityStart: Date
  availabilityEnd: Date | null
  photos: string[]
}
