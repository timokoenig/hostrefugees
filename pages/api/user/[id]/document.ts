/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { User, UserRole } from '@prisma/client'
import formidable, { IncomingForm } from 'formidable'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { newAuthenticatedHandler, withErrorHandler, withHandlers } from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import { deleteFile, listFiles, S3_BUCKET_DOCUMENTS, uploadFile } from 'utils/aws/s3'
import { withSessionRoute } from 'utils/session'

export const config = {
  api: {
    bodyParser: false,
  },
}

const allowedTypes = ['front', 'back', 'selfie']

const allDocumentsUploaded = async (user: User): Promise<boolean> => {
  const files = await listFiles(user.id, S3_BUCKET_DOCUMENTS)
  return files.length == allowedTypes.length
}

async function handleDocumentUpload(req: NextApiRequest, res: NextApiResponse) {
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
    form.parse(req, async (_err, fields, files) => {
      if (fields.type === undefined || !allowedTypes.includes(fields.type as string)) {
        reject(new Error('Wrong type'))
        return
      }
      try {
        // @ts-ignore
        if (files.file === undefined) {
          // Delete existing file
          const fileKey = `${user.id}/${fields.type as string}`
          await deleteFile(fileKey, S3_BUCKET_DOCUMENTS)
        } else {
          const formFile = files.file as unknown as formidable.File
          const file = fs.readFileSync(formFile.filepath)
          const fileKey = `${user.id}/${fields.type as string}`
          await uploadFile(fileKey, file, formFile.mimetype, S3_BUCKET_DOCUMENTS)
        }
        resolve()
      } catch (err: unknown) {
        reject(err)
      }
    })
  })

  // If the user uploaded all required files, we will update the verification date so that the onboarding screen will not show again
  const allDocuments = await allDocumentsUploaded(user)
  if (allDocuments) {
    await prisma.user.update({
      where: {
        id: req.session.user!.id,
      },
      data: {
        updatedAt: new Date(),
        verificationSubmittedAt: new Date(),
      },
    })
  }

  res.status(200).end()
}

export default withErrorHandler(
  withSessionRoute(
    withHandlers([newAuthenticatedHandler(HTTP_METHOD.POST, [UserRole.HOST], handleDocumentUpload)])
  )
)
