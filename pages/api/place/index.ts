import { BathroomType, Feature, HostType, PlaceType, UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { newAuthenticatedHandler, withHandlers } from 'utils/api/helper'
import HTTP_METHOD from 'utils/api/http-method'
import geocode from 'utils/geocode'
import { withSessionRoute } from 'utils/session'
import translateAll from 'utils/translate-all'
import * as Yup from 'yup'

const DEFAULT_COUNTRY = 'Germany'

type RequestBody = {
  title: string
  description: string
  type?: PlaceType
  hostType: HostType
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
  addressStreet: string
  addressHouseNumber: string
  addressZip: string
  addressCity: string
  phoneNumber: string
  houseRules?: string
  arrivalInstructions?: string
  availabilityStart: Date
  availabilityEnd?: Date
}

interface Request extends NextApiRequest {
  body: RequestBody
}

const validationSchemaPets = Yup.object()
  .shape({
    title: Yup.string().min(1).max(100).required(),
    description: Yup.string().min(1).max(5000).required(),
    hostType: Yup.mixed<HostType>().oneOf(Object.values(HostType)).required(),
    petsNumber: Yup.number().min(0).max(100).required(),
    features: Yup.mixed<Feature[]>(),
    addressStreet: Yup.string().min(1).max(100).required(),
    addressHouseNumber: Yup.string().min(1).max(100).required(),
    addressZip: Yup.string().length(5).required(),
    addressCity: Yup.string().min(1).max(100).required(),
    phoneNumber: Yup.string().min(1).max(100).required(),
    availabilityStart: Yup.date().required(),
    availabilityEnd: Yup.date().optional(),
  })
  .noUnknown()

const validationSchemaPeople = Yup.object()
  .shape({
    title: Yup.string().min(1).max(100).required(),
    description: Yup.string().min(1).max(5000).required(),
    type: Yup.mixed<PlaceType>().oneOf(Object.values(PlaceType)).required(),
    hostType: Yup.mixed<HostType>().oneOf(Object.values(HostType)).required(),
    placeAdults: Yup.number().min(0).max(100).required(),
    placeChildren: Yup.number().min(0).max(100).required(),
    placeAdultWomen: Yup.boolean().required(),
    placeAdultMen: Yup.boolean().required(),
    rooms: Yup.number().min(0).max(100).required(),
    beds: Yup.number().min(0).max(100).required(),
    bathroom: Yup.mixed<BathroomType>().oneOf(Object.values(BathroomType)).required(),
    adults: Yup.number().min(0).max(100).required(),
    children: Yup.number().min(0).max(100).required(),
    pets: Yup.boolean(),
    addressStreet: Yup.string().min(1).max(100).required(),
    addressHouseNumber: Yup.string().min(1).max(100).required(),
    addressZip: Yup.string().length(5).required(),
    addressCity: Yup.string().min(1).max(100).required(),
    phoneNumber: Yup.string().min(1).max(100).required(),
    houseRules: Yup.string().max(5000),
    arrivalInstructions: Yup.string().max(5000),
    availabilityStart: Yup.date().required(),
    availabilityEnd: Yup.date().optional(),
  })
  .noUnknown()

const validateBody = async (req: Request): Promise<RequestBody> => {
  if (req.body.hostType == HostType.PETS) {
    return validationSchemaPets.validate(req.body)
  }
  return validationSchemaPeople.validate(req.body)
}

async function handleCreatePlace(req: Request, res: NextApiResponse) {
  const body = await validateBody(req)
  const latLng = await geocode(body.addressCity, DEFAULT_COUNTRY)
  const titleTranslation = await translateAll(body.title)
  const descriptionTranslation = await translateAll(body.description)
  const arrivalInstructionsTranslation = await translateAll(body.arrivalInstructions ?? '')
  const houseRulesTranslation = await translateAll(body.houseRules ?? '')

  const place = await prisma.place.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        connect: {
          id: req.session.user?.id,
        },
      },
      type: PlaceType.PLACE,
      houseRules: '',
      ...body,
      approved: false,
      active: true,
      titleTranslation,
      descriptionTranslation,
      addressCityLat: latLng.lat,
      addressCityLng: latLng.lng,
      addressCountry: DEFAULT_COUNTRY,
      houseRulesTranslation,
      arrivalInstructionsTranslation,
      photos: [],
    },
  })
  res.status(201).send({ id: place.id })
}

export default withSessionRoute(
  withHandlers([newAuthenticatedHandler(HTTP_METHOD.POST, [UserRole.HOST], handleCreatePlace)])
)
