import type { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from 'utils/session'

type Response = {
  ok: boolean
  message?: string
}

async function handleRegistration(req: NextApiRequest, res: NextApiResponse<Response>) {
  // TODO implement user registration
  res.send({ ok: true })
}

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'POST') {
    await handleRegistration(req, res)
    return
  }
  res.status(400).send({ ok: false, message: 'Request method not allowed' })
}

export default withSessionRoute(handler)
