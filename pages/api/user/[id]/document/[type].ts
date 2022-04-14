/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import {
  newAuthenticatedHandler,
  withErrorHandler,
  withHandlers,
  withLogHandler,
} from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import { deleteFile, S3_BUCKET_DOCUMENT } from 'utils/aws/s3'
import { withSessionRoute } from 'utils/session'

const allowedTypes = ['front', 'back', 'selfie']

async function handleDocumentDelete(req: NextApiRequest, res: NextApiResponse) {
  const user = await prisma.user.findUnique({
    where: {
      id: req.session.user!.id,
    },
  })
  if (user == null) throw new HttpError('User not found', HTTP_STATUS_CODE.NOT_FOUND)

  if (!allowedTypes.includes(req.query.type as string))
    throw new HttpError('Wrong document type', HTTP_STATUS_CODE.BAD_REQUEST)

  const fileKey = `${user.id}/${req.query.type as string}`
  await deleteFile(fileKey, S3_BUCKET_DOCUMENT)

  res.status(200).end()
}

export default withLogHandler(
  withErrorHandler(
    withSessionRoute(
      withHandlers([
        newAuthenticatedHandler(HTTP_METHOD.DELETE, [UserRole.HOST], handleDocumentDelete),
      ])
    )
  )
)
