import { compare } from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { newHandler, withErrorHandler, withHandlers } from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import { mapUser } from 'utils/mapper'
import { withSessionRoute } from 'utils/session'
import * as Yup from 'yup'

interface Request extends NextApiRequest {
  body: {
    email: string
    password: string
  }
}

const validationSchema = Yup.object()
  .shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(1).max(100).required(),
  })
  .noUnknown()

async function handleLogin(req: Request, res: NextApiResponse) {
  const body = await validationSchema.validate(req.body)
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  })
  if (user == null) throw new HttpError('User not found', HTTP_STATUS_CODE.NOT_FOUND)

  const valid = await compare(body.password, user.password)
  if (!valid) throw new HttpError('Invalid password', HTTP_STATUS_CODE.BAD_REQUEST)

  req.session.user = mapUser(user)
  await req.session.save()

  res.status(200).end()
}

export default withErrorHandler(
  withSessionRoute(withHandlers([newHandler(HTTP_METHOD.POST, handleLogin)]))
)
