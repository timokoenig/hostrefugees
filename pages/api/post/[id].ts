import { UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { withSessionRoute } from 'utils/session'

interface Request extends NextApiRequest {
  body: {
    approved: boolean
  }
}

async function handleUpdatePost(req: Request, res: NextApiResponse) {
  await prisma.post.update({
    data: {
      updatedAt: new Date(),
      approved: req.body.approved,
    },
    where: {
      id: req.query.id as string,
    },
  })
  res.status(200).end()
}

async function handler(req: Request, res: NextApiResponse) {
  if (req.session.user == undefined || req.session.user.role != UserRole.ADMIN) {
    res.status(401).end()
    return
  }
  if (req.method === 'PUT') {
    await handleUpdatePost(req, res)
    return
  }
  res.status(400).end()
}

export default withSessionRoute(handler)
