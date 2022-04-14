/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/order */
import { UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import handleImageRequest, { deleteCachedImages } from 'utils/api/handle-image-request'
import {
  newAuthenticatedHandler,
  newHandler,
  withErrorHandler,
  withHandlers,
  withLogHandler,
} from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import { validateUUIDQueryParam } from 'utils/api/validate-query-param'
import { deleteFile, S3_BUCKET_PLACE } from 'utils/aws/s3'
import { withSessionRoute } from 'utils/session'

async function handlePlacePhotoDelete(req: NextApiRequest, res: NextApiResponse) {
  const placeId = await validateUUIDQueryParam(req, 'id')
  const photoId = await validateUUIDQueryParam(req, 'photoId')

  const place = await prisma.place.findUnique({
    where: {
      id: placeId,
    },
    include: {
      author: true,
    },
  })
  if (place == null) throw new HttpError('Place not found', HTTP_STATUS_CODE.NOT_FOUND)

  if (place.author.id !== req.session.user!.id) {
    // user can only update own places
    throw new HttpError('Not allowed', HTTP_STATUS_CODE.UNAUTHORIZED)
  }

  if (!place.photos.includes(photoId)) {
    throw new HttpError('Photo not found', HTTP_STATUS_CODE.NOT_FOUND)
  }

  await deleteFile(`${place.id}/${photoId}`, S3_BUCKET_PLACE)
  await deleteCachedImages(`${place.id}/${photoId}`)

  const newPhotos = place.photos.filter(p => p != photoId)
  await prisma.place.update({
    where: {
      id: place.id,
    },
    data: {
      updatedAt: new Date(),
      photos: newPhotos,
      approved: newPhotos.length != 0,
    },
  })

  res.status(200).end()
}

async function handleGetPlacePhoto(req: NextApiRequest, res: NextApiResponse) {
  const placeId = await validateUUIDQueryParam(req, 'id')
  const photoId = await validateUUIDQueryParam(req, 'photoId')

  const place = await prisma.place.findUnique({
    where: {
      id: placeId,
    },
  })
  if (place == null) throw new HttpError('Place not found', HTTP_STATUS_CODE.NOT_FOUND)

  await handleImageRequest(req, res, `${place.id}/${photoId}`, S3_BUCKET_PLACE)
}

export default withLogHandler(
  withErrorHandler(
    withSessionRoute(
      withHandlers([
        newHandler(HTTP_METHOD.GET, handleGetPlacePhoto),
        newAuthenticatedHandler(HTTP_METHOD.DELETE, [UserRole.HOST], handlePlacePhotoDelete),
      ])
    )
  )
)
