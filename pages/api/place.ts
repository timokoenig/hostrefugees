import { Place, UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { withSessionRoute } from 'utils/session'

interface Request extends NextApiRequest {
  body: {
    place: Place
  }
}

async function handleNewPlace(req: Request, res: NextApiResponse) {
  const lat = '1'
  const lng = '2'

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
      addressCityLat: lat,
      addressCityLng: lng,
      addressCountry: 'Germany',
      houseRules: req.body.place.houseRules,
      availabilityStart: req.body.place.availabilityStart,
      availabilityEnd: req.body.place.availabilityEnd,
    },
  })
  res.status(200)
}

async function handleUpdatePlace(req: Request, res: NextApiResponse) {
  const place = await prisma.place.findUnique({
    where: {
      id: req.body.place.id,
    },
    include: {
      author: true,
    },
  })
  if (place === null) {
    res.status(400)
    return
  }
  if (place.author.id !== req.session.user?.id) {
    // user can only update own places
    res.status(400)
    return
  }

  let lat = place.addressCityLat
  let lng = place.addressCityLng
  if (req.body.place.addressCity != place.addressCity) {
    // City changed, therefore we need to refresh the coordinates as well
    lat = '1'
    lng = '2'
  }

  await prisma.place.update({
    where: {
      id: req.body.place.id,
    },
    data: {
      updatedAt: new Date(),
      active: req.body.place.active,
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
      addressCityLat: lat,
      addressCityLng: lng,
      addressCountry: 'Germany',
      houseRules: req.body.place.houseRules,
      availabilityStart: req.body.place.availabilityStart,
      availabilityEnd: req.body.place.availabilityEnd,
    },
  })
  res.status(200)
}

async function handler(req: Request, res: NextApiResponse) {
  if (req.session.user == undefined || req.session.user.role === UserRole.GUEST) {
    res.status(401)
    return
  }
  if (req.method === 'POST') {
    await handleNewPlace(req, res)
    return
  }
  if (req.method === 'PUT') {
    await handleUpdatePlace(req, res)
    return
  }
  res.status(400)
}

export default withSessionRoute(handler)
