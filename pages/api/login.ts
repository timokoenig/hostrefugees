import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { mapUser } from 'utils/mapper'
import { withSessionRoute } from 'utils/session'

interface Request extends NextApiRequest {
  body: {
    email: string
    password: string
  }
}

async function handler(req: Request, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(400)
    return
  }

  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  })
  if (user === null) {
    res.status(400)
    return
  }

  req.session.user = mapUser(user)
  await req.session.save()

  res.status(200)
}

export default withSessionRoute(handler)
