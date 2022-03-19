import { UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { withSessionRoute } from 'utils/session'

async function handleVerification(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user == undefined || req.session.user.role !== UserRole.HOST) {
    res.status(401).end()
    return
  }

  const user = await prisma.user.findUnique({
    where: {
      id: req.session.user.id,
    },
  })
  if (user === null) {
    res.status(400).end()
    return
  }

  await prisma.user.update({
    where: {
      id: req.session.user.id,
    },
    data: {
      updatedAt: new Date(),
      verificationSubmittedAt: new Date(),
    },
  })

  res.status(200).end()
}

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'GET') {
    await handleVerification(req, res)
    return
  }
  res.status(400).end()
}

export default withSessionRoute(handler)
