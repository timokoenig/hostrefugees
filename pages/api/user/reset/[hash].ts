import { hash } from 'bcrypt'
import moment from 'moment'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { withSessionRoute } from 'utils/session'

interface PasswordResetRequest extends NextApiRequest {
  body: {
    email: string
    password: string
  }
}

async function handlePasswordReset(req: PasswordResetRequest, res: NextApiResponse) {
  const queryHash = req.query.hash as string
  if (queryHash == '') {
    res.status(400).end()
    return
  }
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
      passwordResetHash: queryHash,
    },
  })
  if (user == null) {
    res.status(400).end()
    return
  }
  if (moment().isAfter(moment(user.passwordResetAt).add(5, 'minutes'))) {
    await prisma.user.update({
      data: {
        updatedAt: new Date(),
        passwordResetAt: null,
        passwordResetHash: null,
      },
      where: {
        id: user.id,
      },
    })

    res.status(400).end()
    return
  }

  const hashedPassword = await hash(req.body.password, 14)
  await prisma.user.update({
    data: {
      updatedAt: new Date(),
      passwordResetAt: null,
      passwordResetHash: null,
      password: hashedPassword,
    },
    where: {
      id: user.id,
    },
  })

  res.status(200).end()
}

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'POST') {
    await handlePasswordReset(req, res)
    return
  }
  res.status(400).end()
}

export default withSessionRoute(handler)
