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
import {
  emailAcceptRequestGuest,
  emailAcceptRequestHost,
  emailCancelRequest,
  emailDeclineRequest,
  sendEmail,
} from 'utils/email'
import { withSessionRoute } from 'utils/session'
import * as Yup from 'yup'

interface UpdateRequest extends NextApiRequest {
  body: {
    status: RequestStatus
  }
}

const validationSchema = Yup.object()
  .shape({
    status: Yup.mixed<RequestStatus>().oneOf(Object.values(RequestStatus)).required(),
  })
  .noUnknown()

async function handleUpdateRequest(req: UpdateRequest, res: NextApiResponse) {
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

  if (request.author.id === req.session.user.id && body.status !== RequestStatus.CANCELED) {
    // guest can only cancel the request
    res.status(400).end()
    return
  }
  if (request.place.author.id === req.session.user.id && body.status === RequestStatus.CANCELED) {
    // host can only accept and decline requests
    res.status(400).end()
    return
  }

  const updatedRequest = await prisma.request.update({
    where: {
      id: body.id,
    },
    data: {
      updatedAt: new Date(),
      status: body.status,
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

  // Send email to guest and host based on the request status, only if the status has changed
  if (request.status !== updatedRequest.status) {
    switch (updatedRequest.status) {
      case RequestStatus.ACCEPTED:
        await sendEmail(emailAcceptRequestGuest(updatedRequest))
        await sendEmail(emailAcceptRequestHost(updatedRequest))
        break
      case RequestStatus.DECLINED:
        await sendEmail(emailDeclineRequest(updatedRequest))
        break
      case RequestStatus.CANCELED:
        await sendEmail(emailCancelRequest(updatedRequest))
        break
      default:
        break
    }
  }

  if (updatedRequest.status === RequestStatus.ACCEPTED) {
    // Set place inactive so it doesn't appear in the search anymore
    await prisma.place.update({
      where: {
        id: request.place.id,
      },
      data: {
        updatedAt: new Date(),
        active: false,
      },
    })

    // Decline all pending requests for this place
    const pendingRequests = await prisma.request.findMany({
      where: {
        status: null,
        place: {
          id: request.place.id,
        },
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
    for (let i = 0; i < pendingRequests.length; i++) {
      await prisma.request.update({
        where: {
          id: pendingRequests[i].id,
        },
        data: {
          updatedAt: new Date(),
          status: RequestStatus.DECLINED,
        },
      })
      await sendEmail(emailDeclineRequest(updatedRequest))
    }
  }

  res.status(200).end()
}

export default withLogHandler(
  withErrorHandler(
    withSessionRoute(
      withHandlers([
        newAuthenticatedHandler(
          HTTP_METHOD.PUT,
          [UserRole.GUEST, UserRole.HOST],
          handleUpdateRequest
        ),
      ])
    )
  )
)
