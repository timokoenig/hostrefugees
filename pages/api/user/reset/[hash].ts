import { hash } from 'bcrypt'
import moment from 'moment'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { newHandler, withErrorHandler, withHandlers } from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import { withSessionRoute } from 'utils/session'
import * as Yup from 'yup'

interface PasswordResetRequest extends NextApiRequest {
  body: {
    email: string
    password: string
  }
}

async function handlePasswordReset(req: PasswordResetRequest, res: NextApiResponse) {
  const queryHash = await Yup.string()
    .required()
    .length(64)
    .validate(req.query.hash as string)

  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  })
  if (user == null || user.passwordResetHash != queryHash)
    throw new HttpError('User not found', HTTP_STATUS_CODE.NOT_FOUND)

  if (moment().isAfter(moment(user.passwordResetAt).add(5, 'minutes'))) {
    await prisma.user.update({
      data: {
        updatedAt: new Date(),
        passwordResetAt: null,
        passwordResetHash: null,
      },
      where: {
        id: user.id,
      },
    })
    throw new HttpError('Password Reset has expired', HTTP_STATUS_CODE.BAD_REQUEST)
  }

  const hashedPassword = await hash(req.body.password, 14)
  await prisma.user.update({
    data: {
      updatedAt: new Date(),
      passwordResetAt: null,
      passwordResetHash: null,
      password: hashedPassword,
    },
    where: {
      id: user.id,
    },
  })

  res.status(200).end()
}

export default withErrorHandler(
  withSessionRoute(withHandlers([newHandler(HTTP_METHOD.POST, handlePasswordReset)]))
)
