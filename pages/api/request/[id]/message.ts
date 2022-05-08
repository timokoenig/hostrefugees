/* eslint-disable no-await-in-loop */
import { RequestStatus, UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import {
  newAuthenticatedHandler,
  withErrorHandler,
  withHandlers,
  withLogHandler,
} from 'utils/api/helper'
import HTTP_METHOD from 'utils/api/http-method'
import { validateUUIDQueryParam } from 'utils/api/validate-query-param'
import { emailChatMessage, sendEmail } from 'utils/email'
import logger from 'utils/logger'
import { withSessionRoute } from 'utils/session'
import translateAll, { Translation } from 'utils/translate-all'
import * as Yup from 'yup'

interface MessageRequest extends NextApiRequest {
  body: {
    message: string
  }
}

const validationSchema = Yup.object()
  .shape({
    message: Yup.string().min(1).max(5000).required(),
  })
  .noUnknown()

async function handleMessageRequest(req: MessageRequest, res: NextApiResponse) {
  const requestId = await validateUUIDQueryParam(req as NextApiRequest, 'id')
  const body = await validationSchema.validate(req.body)

  const request = await prisma.request.findUnique({
    where: {
      id: requestId,
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
  if (request === null) {
    res.status(400).end()
    return
  }
  if (
    request.author.id !== req.session.user?.id &&
    request.place.author.id !== req.session.user?.id
  ) {
    // user must be author of request (GUEST) or author of place (HOST) to update the status
    res.status(400).end()
    return
  }

  if (request.status == RequestStatus.CANCELED || request.status == RequestStatus.DECLINED) {
    // messages are disabled for canceled or declined requests
    res.status(400).end()
    return
  }

  // Check if we are allowed to translate the message
  // This is the case when both users have enabled the messageTranslation
  const translationActive =
    request.author.messageTranslation && request.place.author.messageTranslation
  const messageTranslation: Translation | undefined = translationActive
    ? await translateAll(body.message)
    : undefined

  const newMessage = await prisma.message.create({
    data: {
      createdAt: new Date(),
      authorId: req.session.user.id,
      requestId: request.id,
      message: body.message,
      messageTranslation,
    },
    include: {
      author: {
        select: {
          id: true,
        },
      },
      request: {
        select: {
          id: true,
        },
      },
    },
  })

  try {
    if (request.author.id === req.session.user.id) {
      // GUEST; therefore host should receive the mail
      await sendEmail(emailChatMessage(newMessage, request.place.author))
    } else if (request.place.author.id === req.session.user.id) {
      // HOST; therefore guest should receive the mail
      await sendEmail(emailChatMessage(newMessage, request.author))
    }
  } catch (err: unknown) {
    logger.error(err)
  }

  res.status(201).send(newMessage)
}

async function handleMessageRefresh(req: NextApiRequest, res: NextApiResponse) {
  const requestId = await validateUUIDQueryParam(req, 'id')

  const request = await prisma.request.findUnique({
    where: {
      id: requestId,
    },
    include: {
      author: true,
      place: {
        include: {
          author: true,
        },
      },
      messages: true,
    },
  })
  if (request === null) {
    res.status(400).end()
    return
  }
  if (
    request.author.id !== req.session.user?.id &&
    request.place.author.id !== req.session.user?.id
  ) {
    // user must be author of request (GUEST) or author of place (HOST) to read messages
    res.status(400).end()
    return
  }

  res.status(200).send(request.messages)
}

export default withLogHandler(
  withErrorHandler(
    withSessionRoute(
      withHandlers([
        newAuthenticatedHandler(
          HTTP_METHOD.POST,
          [UserRole.GUEST, UserRole.HOST],
          handleMessageRequest
        ),
        newAuthenticatedHandler(
          HTTP_METHOD.GET,
          [UserRole.GUEST, UserRole.HOST],
          handleMessageRefresh
        ),
      ])
    )
  )
)
