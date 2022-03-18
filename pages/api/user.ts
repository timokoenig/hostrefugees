import { UserRole } from '@prisma/client'
import { hash } from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { withSessionRoute } from 'utils/session'

interface Request extends NextApiRequest {
  body: {
    firstname: string
    lastname: string
    email: string
    password: string
    role: UserRole
  }
}

async function handleRegistration(req: Request, res: NextApiResponse) {
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  })
  if (user !== null) {
    res.status(400)
    return
  }

  const hashedPassword = await hash(req.body.password, 10)

  await prisma.user.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.lastname,
      password: hashedPassword,
      role: req.body.role === UserRole.HOST ? UserRole.HOST : UserRole.GUEST,
    },
  })
  res.status(201)
}

async function handler(req: Request, res: NextApiResponse<Response>) {
  if (req.method === 'POST') {
    await handleRegistration(req, res)
    return
  }
  res.status(400)
}

export default withSessionRoute(handler)
