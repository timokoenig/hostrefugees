import { UserRole } from '@prisma/client'
import { hash } from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { emailApprovedUser, sendEmail } from 'utils/email'
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

interface UpdateRequest extends NextApiRequest {
  body: {
    id: string
    verified: boolean
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
      email: req.body.lastname,
      password: hashedPassword,
      role: req.body.role === UserRole.HOST ? UserRole.HOST : UserRole.GUEST,
    },
  })
  res.status(201).end()
}

async function handleUpdateUser(req: UpdateRequest, res: NextApiResponse) {
  if (req.session.user == undefined || req.session.user.role !== UserRole.ADMIN) {
    res.status(401).end()
    return
  }

  const user = await prisma.user.findUnique({
    where: {
      id: req.body.id,
    },
  })
  if (user === null) {
    res.status(400).end()
    return
  }

  await prisma.user.update({
    where: {
      id: req.body.id,
    },
    data: {
      updatedAt: new Date(),
      verified: req.body.verified,
    },
  })

  if (user.verified !== req.body.verified && req.body.verified) {
    await sendEmail(emailApprovedUser(user))
  }

  res.status(200).end()
}

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'POST') {
    await handleRegistration(req, res)
    return
  }
  if (req.method === 'PUT') {
    await handleUpdateUser(req, res)
    return
  }
  res.status(400).end()
}

export default withSessionRoute(handler)
