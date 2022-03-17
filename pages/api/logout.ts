import type { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from 'utils/session'

function handler(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy()
  res.status(200)
}

export default withSessionRoute(handler)
