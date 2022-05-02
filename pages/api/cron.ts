/* eslint-disable no-await-in-loop */
import { RequestStatus } from '@prisma/client'
import moment from 'moment'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { newHandler, withErrorHandler, withHandlers, withLogHandler } from 'utils/api/helper'
import HttpError, { HTTP_STATUS_CODE } from 'utils/api/http-error'
import HTTP_METHOD from 'utils/api/http-method'
import { emailDeclineRequest, emailRequestReminder, sendEmail } from 'utils/email'
import logger from 'utils/logger'

async function handleCron(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = req.headers['x-api-key'] as string | undefined
  if (apiKey == undefined || apiKey !== process.env.CRON_API_KEY)
    throw new HttpError('Unauthorized', HTTP_STATUS_CODE.UNAUTHORIZED)

  // - Send email reminder to open requests after 48 hours
  const openRequests = await prisma.request.findMany({
    where: {
      status: null,
      reminderSentAt: null,
      createdAt: {
        lte: moment().subtract(2, 'days').toDate(),
      },
    },
  })
  for (let i = 0; i < openRequests.length; i++) {
    const updatedRequest = await prisma.request.update({
      where: {
        id: openRequests[i].id,
      },
      data: {
        updatedAt: new Date(),
        reminderSentAt: new Date(),
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
    try {
      await sendEmail(emailRequestReminder(updatedRequest))
    } catch (err: unknown) {
      logger.error(err, 'Failed to send request reminder email')
    }
  }

  // - Close expired requests after 10 days
  const expiredRequests = await prisma.request.findMany({
    where: {
      status: null,
      createdAt: {
        lte: moment().subtract(10, 'days').toDate(),
      },
    },
  })
  for (let i = 0; i < expiredRequests.length; i++) {
    const updatedRequest = await prisma.request.update({
      where: {
        id: expiredRequests[i].id,
      },
      data: {
        updatedAt: new Date(),
        status: RequestStatus.DECLINED,
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
    try {
      await sendEmail(emailDeclineRequest(updatedRequest))
    } catch (err: unknown) {
      logger.error(err, 'Failed to send decline request email')
    }
  }

  res.status(200).end()
}

export default withLogHandler(
  withErrorHandler(withHandlers([newHandler(HTTP_METHOD.GET, handleCron)]))
)
