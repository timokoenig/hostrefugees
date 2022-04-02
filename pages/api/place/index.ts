import { BathroomType, PlaceType, UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import geocode from 'utils/geocode'
import { withSessionRoute } from 'utils/session'
import translateAll from 'utils/translate-all'

const DEFAULT_COUNTRY = 'Germany'

interface Request extends NextApiRequest {
  body: {
    title: string
    description: string
    type: PlaceType
    placeAdults: number
    placeChildren: number
    placeAdultWomen: boolean
    placeAdultMen: boolean
    rooms: number
    beds: number
    bathroom: BathroomType
    adults: number
    children: number
    pets: boolean
    addressStreet: string
    addressHouseNumber: string
    addressZip: string
    addressCity: string
    addressCountry: string
    houseRules: string
    arrivalInstructions: string
    availabilityStart: Date
    availabilityEnd: Date | null
  }
}

async function handleNewPlace(req: Request, res: NextApiResponse) {
  const latLng = await geocode(req.body.addressCity, DEFAULT_COUNTRY)

  const titleTranslation = await translateAll(req.body.title)
  const descriptionTranslation = await translateAll(req.body.description)
  const arrivalInstructionsTranslation = await translateAll(req.body.arrivalInstructions)
  const houseRulesTranslation = await translateAll(req.body.houseRules)

  const place = await prisma.place.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        connect: {
          id: req.session.user?.id,
        },
      },
      approved: false,
      active: true,
      title: req.body.title,
      titleTranslation,
      description: req.body.description,
      descriptionTranslation,
      type: req.body.type,
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
      addressStreet: req.body.addressStreet,
      addressHouseNumber: req.body.addressHouseNumber,
      addressZip: req.body.addressZip,
      addressCity: req.body.addressCity,
      addressCityLat: latLng.lat,
      addressCityLng: latLng.lng,
      addressCountry: DEFAULT_COUNTRY,
      houseRules: req.body.houseRules,
      houseRulesTranslation,
      arrivalInstructions: req.body.arrivalInstructions,
      arrivalInstructionsTranslation,
      availabilityStart: req.body.availabilityStart,
      availabilityEnd: req.body.availabilityEnd,
      photos: [],
    },
  })
  res.status(201).send({ id: place.id })
}

async function handler(req: Request, res: NextApiResponse) {
  if (req.session.user == undefined || req.session.user.role === UserRole.GUEST) {
    res.status(401).end()
    return
  }
  if (req.method === 'POST') {
    await handleNewPlace(req, res)
    return
  }
  res.status(400).end()
}

export default withSessionRoute(handler)
