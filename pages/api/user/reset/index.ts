/* eslint-disable import/order */
import { UserRole } from '@prisma/client'
import crypto from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { emailPasswordReset, sendEmail } from 'utils/email'
import { withSessionRoute } from 'utils/session'

interface PasswordHashRequest extends NextApiRequest {
  body: {
    email: string
  }
}

async function handleRequestPasswordReset(req: PasswordHashRequest, res: NextApiResponse) {
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  })
  if (user === null || user.role === UserRole.ADMIN) {
    res.status(400).end()
    return
  }

  const passwordHash = crypto.randomBytes(64).toString('hex')
  await prisma.user.update({
    data: {
      updatedAt: new Date(),
      passwordResetAt: new Date(),
      passwordResetHash: passwordHash,
    },
    where: {
      id: user.id,
    },
  })

  await sendEmail(emailPasswordReset(user, passwordHash))

  res.status(200).send({
    hash: passwordHash,
  })
}

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'POST') {
    await handleRequestPasswordReset(req, res)
    return
  }
  res.status(400).end()
}

export default withSessionRoute(handler)
