/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UserRole } from '@prisma/client'
import formidable, { IncomingForm } from 'formidable'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import sharp from 'sharp'
import {
  newAuthenticatedHandler,
  newHandler,
  withErrorHandler,
  withHandlers,
} from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import { deleteFile, readFile, S3_BUCKET_USER, uploadFile } from 'utils/aws/s3'
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

  await new Promise<void>((resolve, reject) => {
    const form = new IncomingForm({
      maxFiles: 1,
      maxFileSize: 20 * 1024 * 1024,
      filter: ({ mimetype }): boolean => {
        // keep only images
        return mimetype?.includes('image') ?? false
      },
    })
    form.parse(req, async (_err, _fields, files) => {
      try {
        // @ts-ignore
        if (files.file === undefined) {
          // Delete existing file
          await deleteFile(user.id, S3_BUCKET_USER)
        } else {
          const formFile = files.file as unknown as formidable.File
          const file = fs.readFileSync(formFile.filepath)
          await uploadFile(user.id, file, formFile.mimetype, S3_BUCKET_USER)
        }
        resolve()
      } catch (err: unknown) {
        reject(err)
      }
    })
  })

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
    res.setHeader('Content-Type', image.contentType)
    res.send(resizedImage)
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
