import type { NextApiRequest, NextApiResponse } from 'next'
import {
  newAuthenticatedHandler,
  withErrorHandler,
  withHandlers,
  withLogHandler,
} from 'utils/api/helper'
import HTTP_METHOD from 'utils/api/http-method'
import { withSessionRoute } from 'utils/session'

function handleLogout(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy()
  res.status(200).end()
}

export default withLogHandler(
  withErrorHandler(
    withSessionRoute(withHandlers([newAuthenticatedHandler(HTTP_METHOD.GET, [], handleLogout)]))
  )
)
