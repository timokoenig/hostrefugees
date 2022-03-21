import { BathroomType, PlaceType, UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import geocode from 'utils/geocode'
import { withSessionRoute } from 'utils/session'

const DEFAULT_COUNTRY = 'Germany'

interface Request extends NextApiRequest {
  body: {
    active?: boolean
    title?: string
    description?: string
    type?: PlaceType
    rooms?: number
    beds?: number
    bathroom?: BathroomType
    adults?: number
    children?: number
    addressStreet?: string
    addressHouseNumber?: string
    addressZip?: string
    addressCity?: string
    addressCountry?: string
    houseRules?: string
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
  if (place === null) {
    res.status(400).end()
    return
  }
  if (place.author.id !== req.session.user?.id) {
    // user can only update own places
    res.status(400).end()
    return
  }

  let lat = place.addressCityLat
  let lng = place.addressCityLng
  if (req.body.addressCity && req.body.addressCity != place.addressCity) {
    // City changed, therefore we need to refresh the coordinates as well
    const latLng = await geocode(req.body.addressCity, DEFAULT_COUNTRY)
    lat = latLng.lat
    lng = latLng.lng
  }

  await prisma.place.update({
    where: {
      id: req.query.id as string,
    },
    data: {
      updatedAt: new Date(),
      active: req.body.active,
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      rooms: req.body.rooms,
      beds: req.body.beds,
      bathroom: req.body.bathroom,
      adults: req.body.adults,
      children: req.body.children,
      addressStreet: req.body.addressStreet,
      addressHouseNumber: req.body.addressHouseNumber,
      addressZip: req.body.addressZip,
      addressCity: req.body.addressCity,
      addressCityLat: lat,
      addressCityLng: lng,
      houseRules: req.body.houseRules,
      availabilityStart: req.body.availabilityStart,
      availabilityEnd: req.body.availabilityEnd,
    },
  })
  res.status(200).end()
}

async function handler(req: Request, res: NextApiResponse) {
  if (req.session.user == undefined || req.session.user.role === UserRole.GUEST) {
    res.status(401).end()
    return
  }
  if (req.method === 'PUT') {
    await handleUpdatePlace(req, res)
    return
  }
  res.status(400).end()
}

export default withSessionRoute(handler)
