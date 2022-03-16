import { BathroomType, Place, PlaceType, User } from '@prisma/client'

export type MappedUser = {
  id: string
  firstname: string
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
  type: PlaceType
  rooms: number
  beds: number
  bathroom: BathroomType
  adults: number
  children: number
  addressCity: string
  addressCityLat?: string
  addressCityLng?: string
  houseRules: string
  availabilityStart: Date
  availabilityEnd?: Date
}

export const mapUser = (prismaUser: User): MappedUser => {
  return {
    id: prismaUser.id,
    firstname: prismaUser.firstname,
    languages: prismaUser.languages,
  }
}

export const mapPlace = (prismaPlace: Place) => {
  return {
    id: prismaPlace.id,
    createdAt: prismaPlace.createdAt.toISOString(),
    author: {
      id: '1',
      firstname: 'foo',
      languages: ['en'],
    },
    approved: prismaPlace.approved,
    active: prismaPlace.active,
    title: prismaPlace.title,
    description: prismaPlace.description,
    type: prismaPlace.type,
    rooms: prismaPlace.rooms,
    beds: prismaPlace.beds,
    bathroom: prismaPlace.bathroom,
    adults: prismaPlace.adults,
    children: prismaPlace.children,
    addressCity: prismaPlace.addressCity,
    addressCityLat: prismaPlace.addressCityLat,
    addressCityLng: prismaPlace.addressCityLng,
    houseRules: prismaPlace.houseRules,
    availabilityStart: prismaPlace.availabilityStart.toISOString(),
    availabilityEnd: prismaPlace.availabilityEnd?.toISOString() ?? null,
  }
}
