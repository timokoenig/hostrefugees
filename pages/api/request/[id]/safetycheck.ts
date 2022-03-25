import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { withSessionRoute } from 'utils/session'

interface Request extends NextApiRequest {
  body: {
    isSafe: boolean
  }
}

async function handleSafetyCheck(req: Request, res: NextApiResponse) {
  const safetyCheck = await prisma.safetyCheck.findFirst({
    where: {
      author: {
        id: req.session.user?.id,
      },
      request: {
        id: req.query.id as string,
      },
    },
  })
  if (safetyCheck !== null) {
    res.status(400).end()
    return
  }

  const newSafetyCheck = await prisma.safetyCheck.create({
    data: {
      createdAt: new Date(),
      author: {
        connect: {
          id: req.session.user?.id,
        },
      },
      request: {
        connect: {
          id: req.query.id as string,
        },
      },
      safe: req.body.isSafe,
    },
  })

  res.status(200).send(newSafetyCheck)
}

async function handler(req: Request, res: NextApiResponse) {
  if (req.session.user == undefined) {
    res.status(401).end()
    return
  }
  if (req.method === 'POST') {
    await handleSafetyCheck(req, res)
    return
  }
  res.status(400).end()
}

export default withSessionRoute(handler)
