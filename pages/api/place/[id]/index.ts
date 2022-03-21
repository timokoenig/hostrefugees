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
  if (req.body.place.addressCity != place.addressCity) {
    // City changed, therefore we need to refresh the coordinates as well
    const latLng = await geocode(req.body.place.addressCity, DEFAULT_COUNTRY)
    lat = latLng.lat
    lng = latLng.lng
  }

  await prisma.place.update({
    where: {
      id: req.query.id as string,
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
      addressCountry: DEFAULT_COUNTRY,
      houseRules: req.body.place.houseRules,
      availabilityStart: req.body.place.availabilityStart,
      availabilityEnd: req.body.place.availabilityEnd,
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
