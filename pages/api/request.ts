import type { NextApiRequest, NextApiResponse } from 'next'
import { RequestStatus } from 'utils/model'
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

async function handler(req: Request, res: NextApiResponse<Response>) {
  if (req.method !== 'PUT') {
    res.status(400).send({ ok: false, message: 'Only PUT requests allowed' })
    return
  }

  // TODO implement request update

  res.send({ ok: true })
}

export default withSessionRoute(handler)
