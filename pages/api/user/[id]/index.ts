import { UserRole } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/client'
import { emailApprovedUser, sendEmail } from 'utils/email'
import { withSessionRoute } from 'utils/session'

interface UpdateRequest extends NextApiRequest {
  body: {
    verified?: boolean
    languages?: string[]
  }
}

async function handleUpdateUser(req: UpdateRequest, res: NextApiResponse) {
  if (req.session.user == undefined) {
    res.status(401).end()
    return
  }

  if (req.query.id !== req.session.user.id) {
    // Users can only edit their own profile
    res.status(400).end()
    return
  }

  const user = await prisma.user.findUnique({
    where: {
      id: req.query.id,
    },
  })
  if (user === null) {
    res.status(400).end()
    return
  }

  const data: {
    updatedAt: Date
    verified?: boolean
    languages?: string[]
  } = {
    updatedAt: new Date(),
  }
  if (req.body.languages !== undefined) {
    data.languages = req.body.languages
  }

  if (req.session.user.role == UserRole.ADMIN) {
    if (req.body.verified !== undefined) {
      data.verified = req.body.verified
    }
  }

  await prisma.user.update({
    where: {
      id: req.query.id,
    },
    data,
  })

  if (
    req.session.user.role === UserRole.ADMIN &&
    user.verified !== req.body.verified &&
    req.body.verified
  ) {
    await sendEmail(emailApprovedUser(user))
  }

  res.status(200).end()
}

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'PUT') {
    await handleUpdateUser(req, res)
    return
  }
  res.status(400).end()
}

export default withSessionRoute(handler)
