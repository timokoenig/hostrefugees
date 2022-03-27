import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import geocode from 'utils/geocode'
import { withSessionRoute } from 'utils/session'

const DEFAULT_COUNTRY = 'Germany'

interface Request extends NextApiRequest {
  body: {
    title: string
    description: string
    addressStreet: string
    addressHouseNumber: string
    addressZip: string
    addressCity: string
  }
}

async function handleNewPost(req: Request, res: NextApiResponse) {
  const latLng = await geocode(req.body.addressCity, DEFAULT_COUNTRY)

  const post = await prisma.post.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      title: req.body.title,
      description: req.body.description,
      addressStreet: req.body.addressStreet,
      addressHouseNumber: req.body.addressHouseNumber,
      addressZip: req.body.addressZip,
      addressCity: req.body.addressCity,
      addressCityLat: latLng.lat,
      addressCityLng: latLng.lng,
      addressCountry: DEFAULT_COUNTRY,
    },
  })
  res.status(201).send({ id: post.id })
}

async function handler(req: Request, res: NextApiResponse) {
  if (req.method === 'POST') {
    await handleNewPost(req, res)
    return
  }
  res.status(400).end()
}

export default withSessionRoute(handler)
