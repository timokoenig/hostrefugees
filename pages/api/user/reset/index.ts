/* eslint-disable import/order */
import { UserRole } from '@prisma/client'
import crypto from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { newHandler, withErrorHandler, withHandlers, withLogHandler } from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import { emailPasswordReset, sendEmail } from 'utils/email'
import { withSessionRoute } from 'utils/session'
import * as Yup from 'yup'

interface PasswordHashRequest extends NextApiRequest {
  body: {
    email: string
  }
}

const validationSchema = Yup.object()
  .shape({
    email: Yup.string().email().required(),
  })
  .noUnknown()

async function handleRequestPasswordReset(req: PasswordHashRequest, res: NextApiResponse) {
  const body = await validationSchema.validate(req.body)

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  })
  if (user === null || user.role === UserRole.ADMIN)
    throw new HttpError('User not found', HTTP_STATUS_CODE.NOT_FOUND)

  const passwordHash = crypto.randomBytes(64).toString('hex')
  await prisma.user.update({
    data: {
      updatedAt: new Date(),
      passwordResetAt: new Date(),
      passwordResetHash: passwordHash,
    },
    where: {
      id: user.id,
    },
  })

  await sendEmail(emailPasswordReset(user, passwordHash))

  res.status(200).send({
    hash: passwordHash,
  })
}

export default withLogHandler(
  withErrorHandler(
    withSessionRoute(withHandlers([newHandler(HTTP_METHOD.POST, handleRequestPasswordReset)]))
  )
)
