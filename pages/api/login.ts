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

type Response = {
  ok: boolean
  message?: string
}

async function handler(req: Request, res: NextApiResponse<Response>) {
  if (req.method !== 'POST') {
    res.status(400).send({ ok: false, message: 'Only POST requests allowed' })
    return
  }

  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  })
  if (user === null) {
    res.status(400).send({ ok: false, message: 'Wrong username or password' })
    return
  }

  req.session.user = mapUser(user)
  await req.session.save()

  res.send({ ok: true })
}

export default withSessionRoute(handler)
