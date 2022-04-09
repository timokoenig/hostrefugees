/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { User, UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { newAuthenticatedHandler, withErrorHandler, withHandlers } from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import parsePhotoRequest from 'utils/api/parse-photo-request'
import { listFiles, S3_BUCKET_DOCUMENT, uploadFile } from 'utils/aws/s3'
import { withSessionRoute } from 'utils/session'

export const config = {
  api: {
    bodyParser: false,
  },
}

const allowedTypes = ['front', 'back', 'selfie']

const allDocumentsUploaded = async (user: User): Promise<boolean> => {
  const files = await listFiles(user.id, S3_BUCKET_DOCUMENT)
  return files.length == allowedTypes.length
}

async function handleDocumentUpload(req: NextApiRequest, res: NextApiResponse) {
  const user = await prisma.user.findUnique({
    where: {
      id: req.session.user!.id,
    },
  })
  if (user == null) throw new HttpError('User not found', HTTP_STATUS_CODE.NOT_FOUND)

  const photo = await parsePhotoRequest(req)
  if (photo.fields.type == undefined || !allowedTypes.includes(photo.fields.type as string))
    throw new HttpError('Document type not set', HTTP_STATUS_CODE.BAD_REQUEST)

  const fileKey = `${user.id}/${photo.fields.type as string}`
  await uploadFile(fileKey, photo.data, photo.mimetype, S3_BUCKET_DOCUMENT)

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
