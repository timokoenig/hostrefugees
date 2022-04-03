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
import { newAuthenticatedHandler, withErrorHandler, withHandlers } from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
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

  const newPhotoId = await new Promise<string>((resolve, reject) => {
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
          throw new Error('no file')
        }
        const formFile = files.file as unknown as formidable.File
        const file = fs.readFileSync(formFile.filepath)
        const photoId = uuidv4()
        await uploadFile(`${place.id}/${photoId}`, file, formFile.mimetype, S3_BUCKET_PLACE)

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
        resolve(photoId)
      } catch (err: unknown) {
        reject(err)
      }
    })
  })

  res.status(200).send({ id: newPhotoId })
}

export default withErrorHandler(
  withSessionRoute(
    withHandlers([
      newAuthenticatedHandler(HTTP_METHOD.POST, [UserRole.HOST], handlePlacePhotoUpload),
    ])
  )
)
