import { UserRole } from '@prisma/client'
import { hash } from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { withSessionRoute } from 'utils/session'

interface RegistrationRequest extends NextApiRequest {
  body: {
    firstname: string
    lastname: string
    email: string
    password: string
    role: UserRole
  }
}

async function handleRegistration(req: RegistrationRequest, res: NextApiResponse) {
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  })
  if (user !== null) {
    res.status(400).end()
    return
  }

  const hashedPassword = await hash(req.body.password, 14)

  await prisma.user.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role === UserRole.HOST ? UserRole.HOST : UserRole.GUEST,
    },
  })
  res.status(201).end()
}

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'POST') {
    await handleRegistration(req, res)
    return
  }
  res.status(400).end()
}

export default withSessionRoute(handler)
