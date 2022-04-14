/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-await-in-loop */
import { UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import {
  newAuthenticatedHandler,
  withErrorHandler,
  withHandlers,
  withLogHandler,
} from 'utils/api/helper'
import HTTP_METHOD from 'utils/api/http-method'
import { emailNewRequest, sendEmail } from 'utils/email'
import { withSessionRoute } from 'utils/session'
import translateAll from 'utils/translate-all'
import * as Yup from 'yup'

interface CreateRequest extends NextApiRequest {
  body: {
    placeId: string
    adults?: number
    children?: number
    pets?: boolean
    startDate: Date
    endDate?: Date
    about: string
  }
}

const validationSchema = Yup.object()
  .shape({
    placeId: Yup.string().uuid().required(),
    adults: Yup.number().min(0).max(100),
    children: Yup.number().min(0).max(100),
    pets: Yup.boolean(),
    startDate: Yup.date().required(),
    endDate: Yup.date(),
    about: Yup.string().max(5000).required(),
  })
  .noUnknown()

async function handleNewRequest(req: CreateRequest, res: NextApiResponse) {
  const body = await validationSchema.validate(req.body)
  const aboutTranslation = await translateAll(body.about)

  const request = await prisma.request.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        connect: {
          id: req.session.user!.id,
        },
      },
      place: {
        connect: {
          id: body.placeId,
        },
      },
      adults: body.adults,
      children: body.children,
      pets: body.pets,
      startDate: body.startDate,
      endDate: body.endDate,
      about: body.about,
      aboutTranslation,
    },
    include: {
      author: true,
      place: {
        include: {
          author: true,
        },
      },
    },
  })

  // send email to host
  await sendEmail(emailNewRequest(request))

  res.status(200).end()
}

export default withLogHandler(
  withErrorHandler(
    withSessionRoute(
      withHandlers([newAuthenticatedHandler(HTTP_METHOD.POST, [UserRole.GUEST], handleNewRequest)])
    )
  )
)
