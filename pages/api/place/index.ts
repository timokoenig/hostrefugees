import { Place, UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import geocode from 'utils/geocode'
import { withSessionRoute } from 'utils/session'

const DEFAULT_COUNTRY = 'Germany'

interface Request extends NextApiRequest {
  body: {
    place: Place
  }
}

async function handleNewPlace(req: Request, res: NextApiResponse) {
  const latLng = await geocode(req.body.place.addressCity, DEFAULT_COUNTRY)

  await prisma.place.create({
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
      title: req.body.place.title,
      description: req.body.place.description,
      type: req.body.place.type,
      rooms: req.body.place.rooms,
      beds: req.body.place.beds,
      bathroom: req.body.place.bathroom,
      adults: req.body.place.adults,
      children: req.body.place.children,
      addressStreet: req.body.place.addressStreet,
      addressHouseNumber: req.body.place.addressHouseNumber,
      addressZip: req.body.place.addressZip,
      addressCity: req.body.place.addressCity,
      addressCityLat: latLng.lat,
      addressCityLng: latLng.lng,
      addressCountry: DEFAULT_COUNTRY,
      houseRules: req.body.place.houseRules,
      availabilityStart: req.body.place.availabilityStart,
      availabilityEnd: req.body.place.availabilityEnd,
      photos: [],
    },
  })
  res.status(201).end()
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
