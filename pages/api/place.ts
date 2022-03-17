import { Place } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from 'utils/session'

interface Request extends NextApiRequest {
  body: {
    place: Place
  }
}

type Response = {
  ok: boolean
  message?: string
}

async function handleNewPlace(req: NextApiRequest, res: NextApiResponse<Response>) {
  // TODO implement new place
  res.send({ ok: true })
}

async function handleUpdatePlace(req: NextApiRequest, res: NextApiResponse<Response>) {
  // TODO implement place update
  res.send({ ok: true })
}

async function handler(req: Request, res: NextApiResponse<Response>) {
  if (req.method === 'POST') {
    await handleNewPlace(req, res)
    return
  }
  if (req.method === 'PUT') {
    await handleUpdatePlace(req, res)
    return
  }
  res.status(400).send({ ok: false, message: 'Request method not allowed' })
}

export default withSessionRoute(handler)
