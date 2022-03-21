/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Place } from '@prisma/client'
import { File, IncomingForm } from 'formidable'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import prisma from 'prisma/client'
import { withSessionRoute } from 'utils/session'
import { v4 as uuidv4 } from 'uuid'

export const config = {
  api: {
    bodyParser: false,
  },
}

// temporary workaround, s3 will replace it
const saveFile = async (place: Place, photoId: string, file: File) => {
  const data = fs.readFileSync(file.filepath)
  const splitType = file.mimetype?.split('/')
  fs.writeFileSync(
    path.resolve(
      `storage/${place.id}-${photoId}.${
        splitType == undefined ? 'png' : splitType[splitType.length - 1]
      }`
    ),
    data
  )
  fs.unlinkSync(file.filepath)
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
        const photoId = uuidv4()
        // @ts-ignore
        await saveFile(place, photoId, files.file)

        await prisma.place.update({
          where: {
            id: place.id,
          },
          data: {
            updatedAt: new Date(),
            photos: [...place.photos, photoId],
            active: true,
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
