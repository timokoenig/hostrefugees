/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { User } from '@prisma/client'
import { MappedPlace, MappedUser } from './models'

export const mapUser = (prismaUser: User): MappedUser => {
  return {
    id: prismaUser.id,
    firstname: prismaUser.firstname,
    role: prismaUser.role,
    verified: prismaUser.verified,
    languages: prismaUser.languages,
    photo: prismaUser.photoUpdatedAt == null ? null : `/api/user/${prismaUser.id}/photo`,
    messageTranslation: prismaUser.messageTranslation,
  }
}

export const mapPlace = (prismaPlace: any): MappedPlace => {
  return {
    id: prismaPlace.id,
    createdAt: prismaPlace.createdAt,
    author: mapUser(prismaPlace.author),
    approved: prismaPlace.approved,
    active: prismaPlace.active,
    reserved: prismaPlace.reserved,
    title: prismaPlace.title,
    titleTranslation: prismaPlace.titleTranslation,
    description: prismaPlace.description,
    descriptionTranslation: prismaPlace.descriptionTranslation,
    placeAdults: prismaPlace.placeAdults,
    placeChildren: prismaPlace.placeChildren,
    placeAdultWomen: prismaPlace.placeAdultWomen,
    placeAdultMen: prismaPlace.placeAdultMen,
    type: prismaPlace.type,
    hostType: prismaPlace.hostType,
    rooms: prismaPlace.rooms,
    beds: prismaPlace.beds,
    bathroom: prismaPlace.bathroom,
    adults: prismaPlace.adults,
    children: prismaPlace.children,
    pets: prismaPlace.pets,
    petsNumber: prismaPlace.petsNumber,
    features: prismaPlace.features,
    addressCity: prismaPlace.addressCity,
    addressCityLat: prismaPlace.addressCityLat,
    addressCityLng: prismaPlace.addressCityLng,
    houseRules: prismaPlace.houseRules,
    houseRulesTranslation: prismaPlace.houseRulesTranslation,
    availabilityStart: prismaPlace.availabilityStart,
    availabilityEnd: prismaPlace.availabilityEnd,
    photos: prismaPlace.photos,
  }
}
