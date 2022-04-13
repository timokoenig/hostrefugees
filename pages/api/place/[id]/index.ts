import { BathroomType, Feature, HostType, PlaceType, UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { newAuthenticatedHandler, withErrorHandler, withHandlers } from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import geocode from 'utils/geocode'
import { withSessionRoute } from 'utils/session'
import translateAll, { Translation } from 'utils/translate-all'

const DEFAULT_COUNTRY = 'Germany'

interface Request extends NextApiRequest {
  body: {
    active?: boolean
    title?: string
    description?: string
    type?: PlaceType
    hostType?: HostType
    placeAdults?: number
    placeChildren?: number
    placeAdultWomen?: boolean
    placeAdultMen?: boolean
    rooms?: number
    beds?: number
    bathroom?: BathroomType
    adults?: number
    children?: number
    pets?: boolean
    petsNumber?: number
    features?: Feature[]
    addressStreet?: string
    addressHouseNumber?: string
    addressZip?: string
    addressCity?: string
    addressCountry?: string
    phoneNumber?: string
    houseRules?: string
    arrivalInstructions?: string
    availabilityStart?: Date
    availabilityEnd?: Date | null
  }
}

async function handleUpdatePlace(req: Request, res: NextApiResponse) {
  const place = await prisma.place.findUnique({
    where: {
      id: req.query.id as string,
    },
    include: {
      author: true,
    },
  })
  if (place == null) throw new HttpError('Place not found', HTTP_STATUS_CODE.NOT_FOUND)

  if (place.author.id !== req.session.user?.id) {
    // user can only update own places
    throw new HttpError('Not allowed', HTTP_STATUS_CODE.UNAUTHORIZED)
  }

  let lat = place.addressCityLat
  let lng = place.addressCityLng
  if (req.body.addressCity && req.body.addressCity != place.addressCity) {
    // City changed, therefore we need to refresh the coordinates as well
    const latLng = await geocode(req.body.addressCity, DEFAULT_COUNTRY)
    lat = latLng.lat
    lng = latLng.lng
  }

  let titleTranslation = place.titleTranslation as Translation | undefined | null
  if (req.body.title && req.body.title != place.title) {
    // Title changed, therefore we need to update the translation
    titleTranslation = await translateAll(req.body.title)
  }
  if (titleTranslation == null) {
    titleTranslation = undefined
  }

  let descriptionTranslation = place.descriptionTranslation as Translation | undefined
  if (req.body.description && req.body.description != place.description) {
    // Description changed, therefore we need to update the translation
    descriptionTranslation = await translateAll(req.body.description)
  }
  if (descriptionTranslation == null) {
    descriptionTranslation = undefined
  }

  let houseRulesTranslation = place.houseRulesTranslation as Translation | undefined
  if (req.body.houseRules && req.body.houseRules != place.houseRules) {
    // HouseRules changed, therefore we need to update the translation
    houseRulesTranslation = await translateAll(req.body.houseRules)
  }
  if (houseRulesTranslation == null) {
    houseRulesTranslation = undefined
  }

  let arrivalInstructionsTranslation = place.arrivalInstructionsTranslation as
    | Translation
    | undefined
  if (req.body.arrivalInstructions && req.body.arrivalInstructions != place.arrivalInstructions) {
    // ArrivalInstructions changed, therefore we need to update the translation
    arrivalInstructionsTranslation = await translateAll(req.body.arrivalInstructions)
  }
  if (arrivalInstructionsTranslation == null) {
    arrivalInstructionsTranslation = undefined
  }

  await prisma.place.update({
    where: {
      id: req.query.id as string,
    },
    data: {
      updatedAt: new Date(),
      active: req.body.active,
      title: req.body.title,
      titleTranslation,
      description: req.body.description,
      descriptionTranslation,
      type: req.body.type,
      hostType: req.body.hostType,
      placeAdults: req.body.placeAdults,
      placeChildren: req.body.placeChildren,
      placeAdultWomen: req.body.placeAdultWomen,
      placeAdultMen: req.body.placeAdultMen,
      rooms: req.body.rooms,
      beds: req.body.beds,
      bathroom: req.body.bathroom,
      adults: req.body.adults,
      children: req.body.children,
      pets: req.body.pets,
      petsNumber: req.body.petsNumber,
      features: req.body.features,
      addressStreet: req.body.addressStreet,
      addressHouseNumber: req.body.addressHouseNumber,
      addressZip: req.body.addressZip,
      addressCity: req.body.addressCity,
      addressCityLat: lat,
      addressCityLng: lng,
      houseRules: req.body.houseRules,
      houseRulesTranslation,
      arrivalInstructions: req.body.arrivalInstructions,
      arrivalInstructionsTranslation,
      availabilityStart: req.body.availabilityStart,
      availabilityEnd: req.body.availabilityEnd,
    },
  })
  res.status(200).end()
}

export default withErrorHandler(
  withSessionRoute(
    withHandlers([
      newAuthenticatedHandler(HTTP_METHOD.PUT, [UserRole.HOST, UserRole.ADMIN], handleUpdatePlace),
    ])
  )
)
