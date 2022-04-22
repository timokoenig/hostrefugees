/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import handleImageRequest from 'utils/api/handle-image-request'
import {
  newAuthenticatedHandler,
  newHandler,
  withErrorHandler,
  withHandlers,
  withLogHandler,
} from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import parsePhotoRequest from 'utils/api/parse-photo-request'
import { validateUUIDQueryParam } from 'utils/api/validate-query-param'
import { S3_BUCKET_USER, uploadFile } from 'utils/aws/s3'
import { deleteCacheFile } from 'utils/aws/s3-cache'
import { withSessionRoute } from 'utils/session'

export const config = {
  api: {
    bodyParser: false,
  },
}

async function handleProfilePhotoUpload(req: NextApiRequest, res: NextApiResponse) {
  const user = await prisma.user.findUnique({
    where: {
      id: req.session.user!.id,
    },
  })
  if (user == null) throw new HttpError('User not found', HTTP_STATUS_CODE.NOT_FOUND)

  const photo = await parsePhotoRequest(req)
  if (photo != null) {
    await uploadFile(user.id, photo.data, photo.mimetype, S3_BUCKET_USER)
    await deleteCacheFile(user.id, S3_BUCKET_USER)
  }

  await prisma.user.update({
    where: {
      id: req.session.user!.id,
    },
    data: {
      updatedAt: new Date(),
      photoUpdatedAt: new Date(),
    },
  })

  res.status(200).end()
}

async function handleGetUserPhoto(req: NextApiRequest, res: NextApiResponse) {
  const userId = await validateUUIDQueryParam(req, 'id')

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
  if (
    user == null ||
    req.session.user == null ||
    (user.id != req.session.user.id && req.session.user.role != UserRole.ADMIN)
  )
    throw new HttpError('User not found', HTTP_STATUS_CODE.NOT_FOUND)

  await handleImageRequest(req, res, user.id, S3_BUCKET_USER)
}

export default withLogHandler(
  withErrorHandler(
    withSessionRoute(
      withHandlers([
        newAuthenticatedHandler(HTTP_METHOD.POST, [], handleProfilePhotoUpload),
        newHandler(HTTP_METHOD.GET, handleGetUserPhoto),
      ])
    )
  )
)
