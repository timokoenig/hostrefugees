/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import formidable, { IncomingForm } from 'formidable'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { S3_BUCKET_PLACE, uploadFile } from 'utils/aws/s3'
import { withSessionRoute } from 'utils/session'
import { v4 as uuidv4 } from 'uuid'

export const config = {
  api: {
    bodyParser: false,
  },
}

async function handlePlacePhotoUpload(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user == undefined) {
    res.status(401).end()
    return
  }

  const place = await prisma.place.findUnique({
    where: {
      id: req.query.id as string,
    },
    include: {
      author: true,
    },
  })
  if (place === null) {
    res.status(400).end()
    return
  }
  if (place.author.id !== req.session.user?.id) {
    // user can only update own places
    res.status(400).end()
    return
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

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'POST') {
    await handlePlacePhotoUpload(req, res)
    return
  }
  res.status(400).end()
}

export default withSessionRoute(handler)
