import type { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from 'utils/session'

type Response = {
  ok: boolean
}

function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  req.session.destroy()
  res.send({ ok: true })
}

export default withSessionRoute(handler)
