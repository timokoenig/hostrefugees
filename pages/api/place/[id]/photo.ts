import { UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { newAuthenticatedHandler, withErrorHandler, withHandlers } from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import parsePhotoRequest from 'utils/api/parse-photo-request'
import { S3_BUCKET_PLACE, uploadFile } from 'utils/aws/s3'
import { withSessionRoute } from 'utils/session'
import { v4 as uuidv4 } from 'uuid'

export const config = {
  api: {
    bodyParser: false,
  },
}

async function handlePlacePhotoUpload(req: NextApiRequest, res: NextApiResponse) {
  const place = await prisma.place.findUnique({
    where: {
      id: req.query.id as string,
    },
    include: {
      author: true,
    },
  })
  if (place == null) throw new HttpError('Place not found', HTTP_STATUS_CODE.NOT_FOUND)

  if (place.author.id !== req.session.user?.id) {
    // user can only update own places
    throw new HttpError('Not allowed', HTTP_STATUS_CODE.UNAUTHORIZED)
  }

  const photo = await parsePhotoRequest(req)
  const photoId = uuidv4()
  await uploadFile(`${place.id}/${photoId}`, photo.data, photo.mimetype, S3_BUCKET_PLACE)

  await prisma.place.update({
    where: {
      id: place.id,
    },
    data: {
      updatedAt: new Date(),
      photos: [...place.photos, photoId],
      approved: true,
    },
  })

  res.status(200).send({ id: photoId })
}

export default withErrorHandler(
  withSessionRoute(
    withHandlers([
      newAuthenticatedHandler(HTTP_METHOD.POST, [UserRole.HOST], handlePlacePhotoUpload),
    ])
  )
)
