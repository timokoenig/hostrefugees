import { PostCategory } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { newHandler, withErrorHandler, withHandlers, withLogHandler } from 'utils/api/helper'
import HTTP_METHOD from 'utils/api/http-method'
import geocode, { LatLngLiteral } from 'utils/geocode'
import { withSessionRoute } from 'utils/session'
import translateAll from 'utils/translate-all'
import * as Yup from 'yup'

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

const validationSchema = Yup.object()
  .shape({
    title: Yup.string().min(1).max(100).trim().required(),
    description: Yup.string().min(1).max(5000).trim().required(),
    category: Yup.mixed<PostCategory[]>(),
    website: Yup.string().max(1000).trim(),
    phoneNumer: Yup.string().max(100).trim(),
    addressStreet: Yup.string().max(100).trim(),
    addressHouseNumber: Yup.string().max(100).trim(),
    addressZip: Yup.string().max(5).trim(),
    addressCity: Yup.string().max(100).trim(),
  })
  .noUnknown()

async function handleCreatePost(req: Request, res: NextApiResponse) {
  const body = await validationSchema.validate(req.body)

  let latLng: LatLngLiteral | null = null
  if (body.addressCity) {
    latLng = await geocode(body.addressCity, DEFAULT_COUNTRY)
  }

  const titleTranslation = await translateAll(body.title)
  const descriptionTranslation = await translateAll(body.description)

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
      title: body.title,
      titleTranslation,
      description: body.description,
      descriptionTranslation,
      category: body.category,
      website: body.website,
      phoneNumber: body.phoneNumber,
      addressStreet: body.addressStreet,
      addressHouseNumber: body.addressHouseNumber,
      addressZip: body.addressZip,
      addressCity: body.addressCity,
      addressCityLat: latLng?.lat,
      addressCityLng: latLng?.lng,
      addressCountry: DEFAULT_COUNTRY,
    },
  })
  res.status(201).send({ id: post.id })
}

export default withLogHandler(
  withErrorHandler(withSessionRoute(withHandlers([newHandler(HTTP_METHOD.POST, handleCreatePost)])))
)
