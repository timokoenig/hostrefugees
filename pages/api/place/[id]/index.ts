import { BathroomType, Feature, HostType, PlaceType, UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import {
  newAuthenticatedHandler,
  withErrorHandler,
  withHandlers,
  withLogHandler,
} from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import { validateUUIDQueryParam } from 'utils/api/validate-query-param'
import geocode from 'utils/geocode'
import { withSessionRoute } from 'utils/session'
import translateAll, { Translation } from 'utils/translate-all'
import * as Yup from 'yup'

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
    phoneNumber?: string
    houseRules?: string
    arrivalInstructions?: string
    availabilityStart?: Date
    availabilityEnd?: Date | null
  }
}

const validationSchema = Yup.object()
  .shape({
    active: Yup.boolean(),
    title: Yup.string().min(1).max(100).trim(),
    description: Yup.string().min(1).max(5000).trim(),
    type: Yup.mixed<PlaceType>().oneOf(Object.values(PlaceType)),
    hostType: Yup.mixed<HostType>().oneOf(Object.values(HostType)),
    placeAdults: Yup.number().min(0).max(100),
    placeChildren: Yup.number().min(0).max(100),
    placeAdultWomen: Yup.boolean(),
    placeAdultMen: Yup.boolean(),
    rooms: Yup.number().min(0).max(100),
    beds: Yup.number().min(0).max(100),
    bathroom: Yup.mixed<BathroomType>().oneOf(Object.values(BathroomType)),
    adults: Yup.number().min(0).max(100),
    children: Yup.number().min(0).max(100),
    pets: Yup.boolean(),
    petsNumber: Yup.number().min(0).max(100).nullable(),
    features: Yup.mixed<Feature[]>(),
    addressStreet: Yup.string().min(1).max(100).trim(),
    addressHouseNumber: Yup.string().min(1).max(100).trim(),
    addressZip: Yup.string().length(5).trim(),
    addressCity: Yup.string().min(1).max(100).trim(),
    phoneNumber: Yup.string().min(1).max(100).trim(),
    houseRules: Yup.string().max(5000).trim(),
    arrivalInstructions: Yup.string().max(5000).trim(),
    availabilityStart: Yup.date(),
    availabilityEnd: Yup.date().nullable(),
  })
  .noUnknown()

async function handleUpdatePlace(req: Request, res: NextApiResponse) {
  const placeId = await validateUUIDQueryParam(req, 'id')
  const body = await validationSchema.validate(req.body)

  const place = await prisma.place.findUnique({
    where: {
      id: placeId,
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
  if (body.addressCity && body.addressCity != place.addressCity) {
    // City changed, therefore we need to refresh the coordinates as well
    const latLng = await geocode(body.addressCity, DEFAULT_COUNTRY)
    lat = latLng.lat
    lng = latLng.lng
  }

  let titleTranslation = place.titleTranslation as Translation | undefined | null
  if (body.title && body.title != place.title) {
    // Title changed, therefore we need to update the translation
    titleTranslation = await translateAll(body.title)
  }
  if (titleTranslation == null) {
    titleTranslation = undefined
  }

  let descriptionTranslation = place.descriptionTranslation as Translation | undefined
  if (body.description && body.description != place.description) {
    // Description changed, therefore we need to update the translation
    descriptionTranslation = await translateAll(body.description)
  }
  if (descriptionTranslation == null) {
    descriptionTranslation = undefined
  }

  let houseRulesTranslation = place.houseRulesTranslation as Translation | undefined
  if (body.houseRules && body.houseRules != place.houseRules) {
    // HouseRules changed, therefore we need to update the translation
    houseRulesTranslation = await translateAll(body.houseRules)
  }
  if (houseRulesTranslation == null) {
    houseRulesTranslation = undefined
  }

  let arrivalInstructionsTranslation = place.arrivalInstructionsTranslation as
    | Translation
    | undefined
  if (body.arrivalInstructions && body.arrivalInstructions != place.arrivalInstructions) {
    // ArrivalInstructions changed, therefore we need to update the translation
    arrivalInstructionsTranslation = await translateAll(body.arrivalInstructions)
  }
  if (arrivalInstructionsTranslation == null) {
    arrivalInstructionsTranslation = undefined
  }

  await prisma.place.update({
    where: {
      id: placeId,
    },
    data: {
      updatedAt: new Date(),
      active: body.active,
      title: body.title,
      titleTranslation,
      description: body.description,
      descriptionTranslation,
      type: body.type,
      hostType: body.hostType,
      placeAdults: body.placeAdults,
      placeChildren: body.placeChildren,
      placeAdultWomen: body.placeAdultWomen,
      placeAdultMen: body.placeAdultMen,
      rooms: body.rooms,
      beds: body.beds,
      bathroom: body.bathroom,
      adults: body.adults,
      children: body.children,
      pets: body.pets,
      petsNumber: body.petsNumber,
      features: body.features,
      addressStreet: body.addressStreet,
      addressHouseNumber: body.addressHouseNumber,
      addressZip: body.addressZip,
      addressCity: body.addressCity,
      addressCityLat: lat,
      addressCityLng: lng,
      houseRules: body.houseRules,
      houseRulesTranslation,
      arrivalInstructions: body.arrivalInstructions,
      arrivalInstructionsTranslation,
      availabilityStart: body.availabilityStart,
      availabilityEnd: body.availabilityEnd,
    },
  })
  res.status(200).end()
}

export default withLogHandler(
  withErrorHandler(
    withSessionRoute(
      withHandlers([
        newAuthenticatedHandler(
          HTTP_METHOD.PUT,
          [UserRole.HOST, UserRole.ADMIN],
          handleUpdatePlace
        ),
      ])
    )
  )
)
