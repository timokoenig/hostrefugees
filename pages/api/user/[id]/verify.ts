/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { newAuthenticatedHandler, withErrorHandler, withHandlers } from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import { withSessionRoute } from 'utils/session'

async function handleVerification(req: NextApiRequest, res: NextApiResponse) {
  const user = await prisma.user.findUnique({
    where: {
      id: req.session.user!.id,
    },
  })
  if (user === null) throw new HttpError('User not found', HTTP_STATUS_CODE.NOT_FOUND)

  await prisma.user.update({
    where: {
      id: req.session.user!.id,
    },
    data: {
      updatedAt: new Date(),
      verificationSubmittedAt: new Date(),
    },
  })

  res.status(200).end()
}

export default withErrorHandler(
  withSessionRoute(
    withHandlers([newAuthenticatedHandler(HTTP_METHOD.GET, [UserRole.HOST], handleVerification)])
  )
)
