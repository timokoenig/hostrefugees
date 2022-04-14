import { UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { newAuthenticatedHandler, withErrorHandler, withHandlers } from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import { validateUUIDQueryParam } from 'utils/api/validate-query-param'
import { withSessionRoute } from 'utils/session'
import * as Yup from 'yup'

interface Request extends NextApiRequest {
  body: {
    isSafe: boolean
  }
}

const validationSchema = Yup.object()
  .shape({
    isSafe: Yup.boolean().required(),
  })
  .noUnknown()

async function handleSafetyCheck(req: Request, res: NextApiResponse) {
  const safetyCheckId = await validateUUIDQueryParam(req, 'id')
  const body = await validationSchema.validate(req.body)

  const safetyCheck = await prisma.safetyCheck.findFirst({
    where: {
      author: {
        id: req.session.user?.id,
      },
      request: {
        id: safetyCheckId,
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
          id: safetyCheckId,
        },
      },
      safe: body.isSafe,
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
