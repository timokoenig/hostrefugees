import { UserRole } from '@prisma/client'
import { hash } from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { newHandler, withErrorHandler, withHandlers } from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import { withSessionRoute } from 'utils/session'

interface RegistrationRequest extends NextApiRequest {
  body: {
    firstname: string
    lastname: string
    email: string
    password: string
    role: UserRole
  }
}

async function handleRegistration(req: RegistrationRequest, res: NextApiResponse) {
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  })
  if (user !== null) throw new HttpError('Email already exists', HTTP_STATUS_CODE.BAD_REQUEST)

  const hashedPassword = await hash(req.body.password, 14)

  await prisma.user.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role === UserRole.HOST ? UserRole.HOST : UserRole.GUEST,
    },
  })
  res.status(201).end()
}

export default withErrorHandler(
  withSessionRoute(withHandlers([newHandler(HTTP_METHOD.POST, handleRegistration)]))
)
