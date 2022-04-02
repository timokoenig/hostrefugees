import { PostCategory } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import geocode, { LatLngLiteral } from 'utils/geocode'
import { withSessionRoute } from 'utils/session'
import translateAll from 'utils/translate-all'

const DEFAULT_COUNTRY = 'Germany'

interface Request extends NextApiRequest {
  body: {
    title: string
    description: string
    category: PostCategory[]
    website: string
    phoneNumber: string
    addressStreet: string
    addressHouseNumber: string
    addressZip: string
    addressCity: string
  }
}

async function handleNewPost(req: Request, res: NextApiResponse) {
  let latLng: LatLngLiteral | null = null
  if (req.body.addressCity != '') {
    latLng = await geocode(req.body.addressCity, DEFAULT_COUNTRY)
  }

  const titleTranslation = await translateAll(req.body.title)
  const descriptionTranslation = await translateAll(req.body.description)

  const post = await prisma.post.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      author:
        req.session.user == undefined
          ? undefined
          : {
              connect: {
                id: req.session.user.id,
              },
            },
      title: req.body.title,
      titleTranslation,
      description: req.body.description,
      descriptionTranslation,
      category: req.body.category,
      website: req.body.website,
      phoneNumber: req.body.phoneNumber,
      addressStreet: req.body.addressStreet,
      addressHouseNumber: req.body.addressHouseNumber,
      addressZip: req.body.addressZip,
      addressCity: req.body.addressCity,
      addressCityLat: latLng?.lat,
      addressCityLng: latLng?.lng,
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
