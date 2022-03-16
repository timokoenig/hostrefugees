/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Place, User } from '@prisma/client'
import { formatAvailability, formatPlaceType } from './formatter'
import { MappedPlace, MappedUser } from './models'

export const mapUser = (prismaUser: User): MappedUser => {
  return {
    id: prismaUser.id,
    firstname: prismaUser.firstname,
    role: prismaUser.role,
    languages: prismaUser.languages,
  }
}

export const mapPlace = (prismaPlace: any): MappedPlace => {
  return {
    id: prismaPlace.id,
    createdAt: prismaPlace.createdAt,
    author: {
      id: prismaPlace.author.id,
      firstname: prismaPlace.author.firstname,
      role: prismaPlace.author.role,
      languages: prismaPlace.author.languages,
    },
    approved: prismaPlace.approved,
    active: prismaPlace.active,
    title: prismaPlace.title,
    description: prismaPlace.description,
    type: prismaPlace.type,
    typeFormatted: formatPlaceType(prismaPlace as Place),
    rooms: prismaPlace.rooms,
    beds: prismaPlace.beds,
    bathroom: prismaPlace.bathroom,
    adults: prismaPlace.adults,
    children: prismaPlace.children,
    addressCity: prismaPlace.addressCity,
    addressCityLat: prismaPlace.addressCityLat,
    addressCityLng: prismaPlace.addressCityLng,
    houseRules: prismaPlace.houseRules,
    availabilityStart: prismaPlace.availabilityStart,
    availabilityEnd: prismaPlace.availabilityEnd,
    availabilityFormatted: formatAvailability(prismaPlace as Place),
  }
}
