/* eslint-disable no-await-in-loop */
import { Request, RequestStatus, UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import {
  emailAcceptRequestGuest,
  emailAcceptRequestHost,
  emailCancelRequest,
  emailDeclineRequest,
  emailNewRequest,
  sendEmail,
} from 'utils/email'
import { withSessionRoute } from 'utils/session'

interface CreateRequest extends NextApiRequest {
  body: {
    request: Request
  }
}

interface UpdateRequest extends NextApiRequest {
  body: {
    id: string
    status: RequestStatus
  }
}

async function handleNewRequest(req: CreateRequest, res: NextApiResponse) {
  if (req.session.user?.role !== UserRole.GUEST) {
    // Only guests can create requests
    res.status(400).end()
    return
  }

  const request = await prisma.request.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        connect: {
          id: req.session.user.id,
        },
      },
      place: {
        connect: {
          id: req.body.request.placeId,
        },
      },
      adults: req.body.request.adults,
      children: req.body.request.children,
      pets: req.body.request.pets,
      startDate: req.body.request.startDate,
      endDate: req.body.request.endDate,
      about: req.body.request.about,
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

async function handleUpdateRequest(req: UpdateRequest, res: NextApiResponse) {
  const request = await prisma.request.findUnique({
    where: {
      id: req.body.id,
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

  if (request.author.id === req.session.user.id && req.body.status !== RequestStatus.CANCELED) {
    // guest can only cancel the request
    res.status(400).end()
    return
  }
  if (
    request.place.author.id === req.session.user.id &&
    req.body.status === RequestStatus.CANCELED
  ) {
    // host can only accept and decline requests
    res.status(400).end()
    return
  }

  const updatedRequest = await prisma.request.update({
    where: {
      id: req.body.id,
    },
    data: {
      updatedAt: new Date(),
      status: req.body.status,
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

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user == undefined) {
    res.status(401).end()
    return
  }
  if (req.method === 'POST') {
    await handleNewRequest(req, res)
    return
  }
  if (req.method === 'PUT') {
    await handleUpdateRequest(req, res)
    return
  }
  res.status(400).end()
}

export default withSessionRoute(handler)
