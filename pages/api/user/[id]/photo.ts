/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import sharp from 'sharp'
import compress from 'utils/api/compress'
import {
  newAuthenticatedHandler,
  newHandler,
  withErrorHandler,
  withHandlers,
} from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import parsePhotoRequest from 'utils/api/parse-photo-request'
import { readFile, S3_BUCKET_USER, uploadFile } from 'utils/aws/s3'
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

  await uploadFile(user.id, photo.data, photo.mimetype, S3_BUCKET_USER)

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
  const user = await prisma.user.findUnique({
    where: {
      id: req.query.id as string,
    },
  })
  if (user == null || (user.id != req.session.user!.id && req.session.user!.role != UserRole.ADMIN))
    throw new HttpError('User not found', HTTP_STATUS_CODE.NOT_FOUND)

  try {
    const image = await readFile(user.id, S3_BUCKET_USER)
    const resizedImage = await sharp(image.data).resize(100).toBuffer()
    const compressedImage = await compress('gzip', resizedImage)
    res.setHeader('Content-Type', image.contentType)
    res.setHeader('Content-Encoding', 'gzip')
    res.send(compressedImage)
  } catch (err: unknown) {
    res.status(400).end()
  }
}

export default withErrorHandler(
  withSessionRoute(
    withHandlers([
      newAuthenticatedHandler(HTTP_METHOD.POST, [], handleProfilePhotoUpload),
      newHandler(HTTP_METHOD.GET, handleGetUserPhoto),
    ])
  )
)
