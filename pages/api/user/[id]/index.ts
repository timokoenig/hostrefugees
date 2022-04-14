/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { newAuthenticatedHandler, withErrorHandler, withHandlers } from 'utils/api/helper'
import HTTP_METHOD from 'utils/api/http-method'
import { validateUUIDQueryParam } from 'utils/api/validate-query-param'
import { emailApprovedUser, sendEmail } from 'utils/email'
import { withSessionRoute } from 'utils/session'
import * as Yup from 'yup'

interface UpdateRequest extends NextApiRequest {
  body: {
    verified?: boolean
    languages?: string[]
    waitlist?: boolean
  }
}

const validationSchema = Yup.object()
  .shape({
    verified: Yup.boolean(),
    languages: Yup.mixed<string[]>(),
    waitlist: Yup.boolean(),
  })
  .noUnknown()

async function handleUpdateUser(req: UpdateRequest, res: NextApiResponse) {
  const userId = await validateUUIDQueryParam(req, 'id')
  const body = await validationSchema.validate(req.body)

  if (userId !== req.session.user!.id && req.session.user!.role !== UserRole.ADMIN) {
    // Users can only edit their own profile, except users with role ADMIN
    res.status(400).end()
    return
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
  if (user === null) {
    res.status(400).end()
    return
  }

  const data: {
    updatedAt: Date
    verified?: boolean
    languages?: string[]
    waitlist?: boolean
  } = {
    updatedAt: new Date(),
  }
  if (body.languages !== undefined) {
    data.languages = body.languages
  }
  if (body.waitlist !== undefined) {
    data.waitlist = body.waitlist
  }

  if (req.session.user!.role == UserRole.ADMIN) {
    if (body.verified !== undefined) {
      data.verified = body.verified
    }
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  })

  if (
    req.session.user!.role === UserRole.ADMIN &&
    user.verified !== body.verified &&
    body.verified
  ) {
    await sendEmail(emailApprovedUser(user))
  }

  res.status(200).end()
}

export default withErrorHandler(
  withSessionRoute(withHandlers([newAuthenticatedHandler(HTTP_METHOD.PUT, [], handleUpdateUser)]))
)
