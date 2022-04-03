import { UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { newAuthenticatedHandler, withErrorHandler, withHandlers } from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import { withSessionRoute } from 'utils/session'

interface Request extends NextApiRequest {
  body: {
    isSafe: boolean
  }
}

async function handleSafetyCheck(req: Request, res: NextApiResponse) {
  const safetyCheck = await prisma.safetyCheck.findFirst({
    where: {
      author: {
        id: req.session.user?.id,
      },
      request: {
        id: req.query.id as string,
      },
    },
  })
  if (safetyCheck != null)
    throw new HttpError('Safetycheck already exists', HTTP_STATUS_CODE.BAD_REQUEST)

  const newSafetyCheck = await prisma.safetyCheck.create({
    data: {
      createdAt: new Date(),
      author: {
        connect: {
          id: req.session.user?.id,
        },
      },
      request: {
        connect: {
          id: req.query.id as string,
        },
      },
      safe: req.body.isSafe,
    },
  })

  res.status(200).send(newSafetyCheck)
}

export default withErrorHandler(
  withSessionRoute(
    withHandlers([
      newAuthenticatedHandler(HTTP_METHOD.POST, [UserRole.GUEST, UserRole.HOST], handleSafetyCheck),
    ])
  )
)
