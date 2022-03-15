import type { NextApiRequest, NextApiResponse } from 'next'
import { User, UserRole } from 'utils/model'
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

const Users: User[] = [
  {
    id: '1',
    firstname: 'admin',
    lastname: 'ADMIN',
    email: 'admin@hostrefugees.eu',
    password: 'admin',
    role: UserRole.Admin,
  },
  {
    id: '2',
    firstname: 'guest',
    lastname: 'GUEST',
    email: 'guest@hostrefugees.eu',
    password: 'guest',
    role: UserRole.Guest,
  },
  {
    id: '3',
    firstname: 'host',
    lastname: 'HOST',
    email: 'host@hostrefugees.eu',
    password: 'host',
    role: UserRole.Host,
  },
]

async function handler(req: Request, res: NextApiResponse<Response>) {
  if (req.method !== 'POST') {
    res.status(400).send({ ok: false, message: 'Only POST requests allowed' })
    return
  }

  const user = Users.find(u => u.email === req.body.email && u.password === req.body.password)
  if (user === undefined) {
    res.status(400).send({ ok: false, message: 'Wrong username or password' })
    return
  }

  req.session.user = user
  await req.session.save()

  res.send({ ok: true })
}

export default withSessionRoute(handler)
