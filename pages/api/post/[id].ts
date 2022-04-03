import { PostCategory, UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { newAuthenticatedHandler, withErrorHandler, withHandlers } from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import geocode, { LatLngLiteral } from 'utils/geocode'
import { withSessionRoute } from 'utils/session'
import translateAll, { Translation } from 'utils/translate-all'

const DEFAULT_COUNTRY = 'Germany'

interface RequestAdmin extends NextApiRequest {
  body: {
    approved: boolean
  }
}

async function handleUpdatePostAdmin(req: RequestAdmin, res: NextApiResponse) {
  await prisma.post.update({
    data: {
      updatedAt: new Date(),
      approved: req.body.approved,
    },
    where: {
      id: req.query.id as string,
    },
  })
  res.status(200).end()
}

interface Request extends NextApiRequest {
  body: {
    title?: string
    description?: string
    category?: PostCategory[]
    website?: string
    phoneNumber?: string
    addressStreet?: string
    addressHouseNumber?: string
    addressZip?: string
    addressCity?: string
  }
}

async function handleUpdatePost(req: Request, res: NextApiResponse) {
  const post = await prisma.post.findFirst({
    where: {
      id: req.query.id as string,
      author: {
        id: req.session.user?.id,
      },
    },
  })
  if (post == null) throw new HttpError('Post not found', HTTP_STATUS_CODE.NOT_FOUND)

  let latLng: LatLngLiteral = { lat: post.addressCityLat ?? '', lng: post.addressCityLng ?? '' }
  if (req.body.addressCity && req.body.addressCity != post.addressCity) {
    latLng = await geocode(req.body.addressCity, DEFAULT_COUNTRY)
  }

  let titleTranslation = post.titleTranslation as Translation | undefined
  if (req.body.title && req.body.title != post.title) {
    // Title changed, therefore we need to update the translation
    titleTranslation = await translateAll(req.body.title)
  }
  if (titleTranslation == null) {
    titleTranslation = undefined
  }

  let descriptionTranslation = post.descriptionTranslation as Translation | undefined
  if (req.body.description && req.body.description != post.description) {
    // Description changed, therefore we need to update the translation
    descriptionTranslation = await translateAll(req.body.description)
  }
  if (descriptionTranslation == null) {
    descriptionTranslation = undefined
  }

  await prisma.post.update({
    data: {
      updatedAt: new Date(),
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
      addressCityLat: latLng.lat,
      addressCityLng: latLng.lng,
    },
    where: {
      id: req.query.id as string,
    },
  })
  res.status(200).end()
}

export default withErrorHandler(
  withSessionRoute(
    withHandlers([
      newAuthenticatedHandler(HTTP_METHOD.PUT, [UserRole.ADMIN], handleUpdatePostAdmin),
      newAuthenticatedHandler(HTTP_METHOD.PUT, [UserRole.GUEST, UserRole.HOST], handleUpdatePost),
    ])
  )
)
