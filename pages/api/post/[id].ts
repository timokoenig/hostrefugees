import { PostCategory, UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import {
  newAuthenticatedHandler,
  withErrorHandler,
  withHandlers,
  withLogHandler,
} from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import { validateUUIDQueryParam } from 'utils/api/validate-query-param'
import geocode, { LatLngLiteral } from 'utils/geocode'
import { withSessionRoute } from 'utils/session'
import translateAll, { Translation } from 'utils/translate-all'
import * as Yup from 'yup'

const DEFAULT_COUNTRY = 'Germany'

interface RequestAdmin extends NextApiRequest {
  body: {
    approved: boolean
  }
}

const validationSchemaAdmin = Yup.object()
  .shape({
    approved: Yup.boolean().required(),
  })
  .noUnknown()

async function handleUpdatePostAdmin(req: RequestAdmin, res: NextApiResponse) {
  const postId = await validateUUIDQueryParam(req, 'id')
  const body = await validationSchemaAdmin.validate(req.body)

  await prisma.post.update({
    data: {
      updatedAt: new Date(),
      approved: body.approved,
    },
    where: {
      id: postId,
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

const validationSchema = Yup.object()
  .shape({
    title: Yup.string().min(1).max(100).trim(),
    description: Yup.string().min(1).max(5000).trim(),
    category: Yup.mixed<PostCategory[]>(),
    website: Yup.string().max(1000).trim(),
    phoneNumer: Yup.string().max(100).trim(),
    addressStreet: Yup.string().min(1).max(100).trim(),
    addressHouseNumber: Yup.string().min(1).max(100).trim(),
    addressZip: Yup.string().length(5).trim(),
    addressCity: Yup.string().min(1).max(100).trim(),
  })
  .noUnknown()

async function handleUpdatePost(req: Request, res: NextApiResponse) {
  const postId = await validateUUIDQueryParam(req, 'id')
  const body = await validationSchema.validate(req.body)

  const post = await prisma.post.findFirst({
    where: {
      id: postId,
      author: {
        id: req.session.user?.id,
      },
    },
  })
  if (post == null) throw new HttpError('Post not found', HTTP_STATUS_CODE.NOT_FOUND)

  let latLng: LatLngLiteral = { lat: post.addressCityLat ?? '', lng: post.addressCityLng ?? '' }
  if (body.addressCity && body.addressCity != post.addressCity) {
    latLng = await geocode(body.addressCity, DEFAULT_COUNTRY)
  }

  let titleTranslation = post.titleTranslation as Translation | undefined
  if (body.title && body.title != post.title) {
    // Title changed, therefore we need to update the translation
    titleTranslation = await translateAll(body.title)
  }
  if (titleTranslation == null) {
    titleTranslation = undefined
  }

  let descriptionTranslation = post.descriptionTranslation as Translation | undefined
  if (body.description && body.description != post.description) {
    // Description changed, therefore we need to update the translation
    descriptionTranslation = await translateAll(body.description)
  }
  if (descriptionTranslation == null) {
    descriptionTranslation = undefined
  }

  await prisma.post.update({
    data: {
      updatedAt: new Date(),
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
      addressCityLat: latLng.lat,
      addressCityLng: latLng.lng,
    },
    where: {
      id: postId,
    },
  })
  res.status(200).end()
}

export default withLogHandler(
  withErrorHandler(
    withSessionRoute(
      withHandlers([
        newAuthenticatedHandler(HTTP_METHOD.PUT, [UserRole.ADMIN], handleUpdatePostAdmin),
        newAuthenticatedHandler(HTTP_METHOD.PUT, [UserRole.GUEST, UserRole.HOST], handleUpdatePost),
      ])
    )
  )
)
