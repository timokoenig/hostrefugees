import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from 'utils/model'
import { withSessionRoute } from 'utils/session'

interface Request extends NextApiRequest {
  body: {
    username: string
    password: string
  }
}

type Response = {
  ok: boolean
  message?: string
}

const Users: User[] = [
  { id: '1', username: 'admin', password: 'admin', admin: true },
  { id: '2', username: 'test', password: 'test', admin: false },
]

async function handler(req: Request, res: NextApiResponse<Response>) {
  if (req.method !== 'POST') {
    res.status(400).send({ ok: false, message: 'Only POST requests allowed' })
    return
  }

  const user = Users.find(u => u.username === req.body.username && u.password === req.body.password)
  if (user === undefined) {
    res.status(400).send({ ok: false, message: 'Wrong username or password' })
    return
  }

  req.session.user = user
  await req.session.save()

  res.send({ ok: true })
}

export default withSessionRoute(handler)
