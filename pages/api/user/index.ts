import { UserRole } from '@prisma/client'
import { hash } from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { newHandler, withErrorHandler, withHandlers, withLogHandler } from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import { withSessionRoute } from 'utils/session'
import * as Yup from 'yup'

interface RegistrationRequest extends NextApiRequest {
  body: {
    firstname: string
    lastname: string
    email: string
    password: string
    role: UserRole
  }
}

const validationSchema = Yup.object()
  .shape({
    firstname: Yup.string().min(1).max(100).required(),
    lastname: Yup.string().min(1).max(100).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(1).max(100).required(),
  })
  .noUnknown()

async function handleRegistration(req: RegistrationRequest, res: NextApiResponse) {
  const body = await validationSchema.validate(req.body)

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  })
  if (user !== null) throw new HttpError('Email already exists', HTTP_STATUS_CODE.BAD_REQUEST)

  const hashedPassword = await hash(body.password, 14)

  await prisma.user.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      password: hashedPassword,
      role: body.role === UserRole.HOST ? UserRole.HOST : UserRole.GUEST,
    },
  })
  res.status(201).end()
}

export default withLogHandler(
  withErrorHandler(
    withSessionRoute(withHandlers([newHandler(HTTP_METHOD.POST, handleRegistration)]))
  )
)
