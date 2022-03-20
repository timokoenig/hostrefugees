/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { User } from '@prisma/client'
import { File, IncomingForm } from 'formidable'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import prisma from 'prisma/client'
import { withSessionRoute } from 'utils/session'

export const config = {
  api: {
    bodyParser: false,
  },
}

// temporary workaround, s3 will replace it
const saveFile = async (user: User, file: File) => {
  const data = fs.readFileSync(file.filepath)
  const splitType = file.mimetype?.split('/')
  fs.writeFileSync(
    path.resolve(
      `storage/${user.id}-photo.${splitType == undefined ? 'png' : splitType[splitType.length - 1]}`
    ),
    data
  )
  fs.unlinkSync(file.filepath)
}

const deleteFile = async (user: User) => {
  fs.readdirSync(path.resolve('storage')).forEach(file => {
    if (file.startsWith(`${user.id}-photo`)) {
      fs.unlinkSync(path.resolve(`storage/${file}`))
    }
  })
}

async function handleVerification(req: NextApiRequest, res: NextApiResponse) {
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
          await deleteFile(user)
        } else {
          // @ts-ignore
          await saveFile(user, files.file)
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
    await handleVerification(req, res)
    return
  }
  res.status(400).end()
}

export default withSessionRoute(handler)
