import { compare } from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { newHandler, withErrorHandler, withHandlers } from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import { mapUser } from 'utils/mapper'
import { withSessionRoute } from 'utils/session'

interface Request extends NextApiRequest {
  body: {
    email: string
    password: string
  }
}

async function handleLogin(req: Request, res: NextApiResponse) {
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  })
  if (user == null) throw new HttpError('User not found', HTTP_STATUS_CODE.NOT_FOUND)

  const valid = await compare(req.body.password, user.password)
  if (!valid) throw new HttpError('Invalid password', HTTP_STATUS_CODE.BAD_REQUEST)

  req.session.user = mapUser(user)
  await req.session.save()

  res.status(200).end()
}

export default withErrorHandler(
  withSessionRoute(withHandlers([newHandler(HTTP_METHOD.POST, handleLogin)]))
)
