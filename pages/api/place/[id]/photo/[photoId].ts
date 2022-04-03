/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/order */
import { UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { newAuthenticatedHandler, withErrorHandler, withHandlers } from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import { deleteFile, readFile, S3_BUCKET_PLACE } from 'utils/aws/s3'
import { withSessionRoute } from 'utils/session'

async function handlePlacePhotoDelete(req: NextApiRequest, res: NextApiResponse) {
  const place = await prisma.place.findUnique({
    where: {
      id: req.query.id as string,
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

  const photoId = req.query.photoId as string
  if (!place.photos.includes(photoId)) {
    throw new HttpError('Photo not found', HTTP_STATUS_CODE.NOT_FOUND)
  }

  await deleteFile(`${place.id}/${photoId}`, S3_BUCKET_PLACE)

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
  const place = await prisma.place.findUnique({
    where: {
      id: req.query.id as string,
    },
  })
  if (place == null) throw new HttpError('Place not found', HTTP_STATUS_CODE.NOT_FOUND)

  try {
    const image = await readFile(`${place.id}/${req.query.photoId}`, S3_BUCKET_PLACE)
    res.setHeader('Content-Type', image.contentType)
    res.send(image.data)
  } catch (err: unknown) {
    res.status(400).end()
  }
}

export default withErrorHandler(
  withSessionRoute(
    withHandlers([
      newAuthenticatedHandler(HTTP_METHOD.GET, [], handleGetPlacePhoto),
      newAuthenticatedHandler(HTTP_METHOD.DELETE, [UserRole.HOST], handlePlacePhotoDelete),
    ])
  )
)
