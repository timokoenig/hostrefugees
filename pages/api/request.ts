import { RequestStatus } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from 'utils/session'

interface Request extends NextApiRequest {
  body: {
    status: RequestStatus
  }
}

type Response = {
  ok: boolean
  message?: string
}

async function handleNewRequest(req: NextApiRequest, res: NextApiResponse<Response>) {
  // TODO implement new request
  res.send({ ok: true })
}

async function handleUpdateRequest(req: NextApiRequest, res: NextApiResponse<Response>) {
  // TODO implement request update
  res.send({ ok: true })
}

async function handler(req: Request, res: NextApiResponse<Response>) {
  if (req.method === 'POST') {
    await handleNewRequest(req, res)
    return
  }
  if (req.method === 'PUT') {
    await handleUpdateRequest(req, res)
    return
  }
  res.status(400).send({ ok: false, message: 'Request method not allowed' })
}

export default withSessionRoute(handler)
