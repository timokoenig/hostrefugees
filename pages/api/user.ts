import type { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from 'utils/session'

type Response = {
  ok: boolean
  message?: string
}

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method !== 'DELETE') {
    res.status(400).send({ ok: false, message: 'Only DELETE requests allowed' })
    return
  }

  // TODO implement delete user

  res.send({ ok: true })
}

export default withSessionRoute(handler)
