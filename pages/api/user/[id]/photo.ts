/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import formidable, { IncomingForm } from 'formidable'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { deleteFile, S3_BUCKET_USER, uploadFile } from 'utils/aws/s3'
import { withSessionRoute } from 'utils/session'

export const config = {
  api: {
    bodyParser: false,
  },
}

async function handleProfilePhotoUpload(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user == undefined) {
    res.status(401).end()
    return
  }

  const user = await prisma.user.findUnique({
    where: {
      id: req.session.user.id,
    },
  })
  if (user === null) {
    res.status(400).end()
    return
  }

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
      id: req.session.user.id,
    },
    data: {
      updatedAt: new Date(),
      photoUpdatedAt: new Date(),
    },
  })

  res.status(200).end()
}

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'POST') {
    await handleProfilePhotoUpload(req, res)
    return
  }
  res.status(400).end()
}

export default withSessionRoute(handler)
